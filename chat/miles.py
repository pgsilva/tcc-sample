#!-*- coding: utf8 -*-
import pandas as pd
import numpy as np
import nltk
import random
import codecs
import csv
from collections import Counter
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold
from sklearn.model_selection import ShuffleSplit
from sklearn.naive_bayes import MultinomialNB
from sklearn.multiclass import OneVsRestClassifier
from sklearn.svm import LinearSVC
from sklearn.multiclass import OneVsOneClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.linear_model import LogisticRegression

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from nltk import tokenize
from sklearn.linear_model import LogisticRegression


class Chat:

    token_pontuacao = tokenize.WordPunctTokenizer()

    # # ======= essa linha de download precisa ser executada caso seja a primeira vez na máquina para baixar as bibliotecas =============
    # nltk.download('stopwords')
    # nltk.download('rslp')  ## para lidar com os sufixos das palavras. Exemplo: não colocar, carreira e carreiras na biblioteca.
    # nltk.download("punkt") ## para lidar com as pontuações

    tfidf = TfidfVectorizer(
        lowercase=False, max_features=50, ngram_range=(1, 2))

    def __init__(self):
        self.leituraArquivo = self.lerDataFrame('originalData.csv')
        self.flag = True

    def lerDataFrame(self, arquivo):
        classificacoes = pd.read_csv(arquivo, encoding='utf-8')
        textosPuros = classificacoes['texto']
        frases = textosPuros.str.lower()
        textosQuebrados = [nltk.tokenize.word_tokenize(
            frase) for frase in frases]
        stopwords = nltk.corpus.stopwords.words("portuguese")
        stemmer = nltk.stem.RSLPStemmer()

        updateDicionario = self.atualizaDicionario(
            textosQuebrados, stopwords, stemmer)
        tradutor = updateDicionario[1]

        return textosQuebrados, stopwords, stemmer, classificacoes, tradutor

    def atualizaDicionario(self, textosQuebrados, stopwords, stemmer):
        dicionario = set()
        for lista in textosQuebrados:
            validas = [stemmer.stem(
                palavra) for palavra in lista if palavra not in stopwords and len(palavra) > 2]
            dicionario.update(validas)

        totalDePalavras = len(dicionario)
        # print("Total de palavras no dicionário:", totalDePalavras)

        # junta cada palavra a um numero chave incremental
        tuplas = zip(dicionario, range(totalDePalavras))
        tradutor = {palavra: indice for palavra, indice in tuplas}

        return dicionario, tradutor

    def vetorizar_texto(self, texto, tradutor, stemmer):
        vetor = [0] * len(tradutor)

        for palavra in texto:
            if len(palavra) > 0:
                raiz = stemmer.stem(palavra)
                if raiz in tradutor:
                    posicao = tradutor[raiz]
                    vetor[posicao] += 1

        return vetor

    def treinar_dados(self, tradutor, stemmer, textosQuebrados, classificacoes):
        vetoresDeTexto = [self.vetorizar_texto(
            texto, tradutor, stemmer) for texto in textosQuebrados]
        marcas = classificacoes['classificacao']

        X = np.array(vetoresDeTexto)
        Y = np.array(marcas)

        porcentagem_de_treino = 0.8

        tamanho_do_treino = int(porcentagem_de_treino * len(Y))
        tamanho_de_validacao = len(Y) - tamanho_do_treino

        treino_dados = X[0:tamanho_do_treino]
        treino_marcacoes = Y[0:tamanho_do_treino]

        validacao_dados = X[tamanho_do_treino:]
        validacao_marcacoes = Y[tamanho_do_treino:]

        return treino_dados, treino_marcacoes, validacao_dados, validacao_marcacoes

    def fit_and_predict(self, nome, modelo, treino_dados, treino_marcacoes):
        k = 10
        # kf = KFold(n_splits=2)
        cv = ShuffleSplit(n_splits=10)
        scores = cross_val_score(modelo, treino_dados, treino_marcacoes, cv=cv)
        taxa_de_acerto = np.mean(scores)

        # print("Taxa de acerto do {0}: {1}".format(nome, taxa_de_acerto))
        return taxa_de_acerto

    # def fit_and_predict_tfidf(nome, modelo)

    def teste_real(self, modelo, validacao_dados, validacao_marcacoes):
        resultado = modelo.predict(validacao_dados)
        acertos = (resultado == validacao_marcacoes)

        total_de_acertos = sum(acertos)
        total_de_elementos = len(validacao_marcacoes)
        taxa_de_acerto = 100.0 * total_de_acertos / total_de_elementos

        print("Taxa de acerto do vencedor no mundo real: {0}".format(
            taxa_de_acerto))

        if (acertos.any() == False):
            print("Hum...Não tenho certeza do que responder")

    def predict(self, modelo, vetor_resposta_usuario):
        resultado = modelo.predict(vetor_resposta_usuario)

        return resultado

    def encontra_melhor_modelo(self, stemmer, textosQuebrados, classificacoes, tradutor, stopwords):

        # pega os quatro retornos do método de treinar_dados
        aux = self.treinar_dados(
            tradutor, stemmer, textosQuebrados, classificacoes)
        # pega o treino_dados que está na primeira posição
        treino_dados = aux[0]
        # pega o treino_marcacoes que está na segunda posição
        treino_marcacoes = aux[1]
        # pega o validacao_dados que está na terceira posição
        validacao_dados = aux[2]
        # pega o validacao_marcacoes que está na quarta posição
        validacao_marcacoes = aux[3]

        resultados = {}

        modeloMultinomial = MultinomialNB()
        resultadoMultinomial = self.fit_and_predict(
            "MultinomialNB", modeloMultinomial, treino_dados, treino_marcacoes)
        resultados[resultadoMultinomial] = modeloMultinomial

        modeloOneVsRest = OneVsRestClassifier(LinearSVC(random_state=0))
        resultadoOneVsRest = self.fit_and_predict(
            "OneVsRest", modeloOneVsRest, treino_dados, treino_marcacoes)
        resultados[resultadoOneVsRest] = modeloOneVsRest

        modeloOneVsOne = OneVsOneClassifier(LinearSVC(random_state=0))
        resultadoOneVsOne = self.fit_and_predict(
            "OneVsOne", modeloOneVsOne, treino_dados, treino_marcacoes)
        resultados[resultadoOneVsOne] = modeloOneVsOne

        modeloAdaBoost = AdaBoostClassifier()
        resultadoAdaBoost = self.fit_and_predict(
            "AdaBoostClassifier", modeloAdaBoost, treino_dados, treino_marcacoes)
        resultados[resultadoAdaBoost] = modeloAdaBoost

        modeloLogisticRegression = LogisticRegression(
            solver="lbfgs", multi_class='auto')
        resultadoLogisticRegression = self.fit_and_predict(
            "Logistic Regression", modeloLogisticRegression, treino_dados, treino_marcacoes)
        resultados[resultadoLogisticRegression] = modeloLogisticRegression

        frase_processada = list()
        for opiniao in classificacoes["texto"]:
            nova_frase = list()
            palavras_texto = self.token_pontuacao.tokenize(opiniao)
            for palavra in palavras_texto:
                if palavra not in stopwords:
                    nova_frase.append(stemmer.stem(palavra))
            frase_processada.append(' '.join(nova_frase))

        classificacoes["tratamento"] = frase_processada

        modeloLogisticRegression_TFIDF = LogisticRegression(
            solver="lbfgs", multi_class='auto')

        tfidf_tratados = self.tfidf.fit_transform(classificacoes['tratamento'])
        treino, teste, classe_treino, classe_teste = train_test_split(tfidf_tratados,
                                                                      classificacoes['classificacao'],
                                                                      random_state=42)
        # modeloLogisticRegression_TFIDF.fit(treino, classe_treino)
        # resultadoLogisticRegression_TF_IDF = modeloLogisticRegression.score(teste, classe_teste)
        resultadoLogisticRegression_TF_IDF = self.fit_and_predict(
            "Logistic Regression TF-IDF", modeloLogisticRegression_TFIDF, treino, classe_treino)
        resultados[resultadoLogisticRegression_TF_IDF] = modeloLogisticRegression_TFIDF
        # print(
        #     "Acuracia TF-IDF Tratados: {0}".format(resultadoLogisticRegression_TF_IDF))

        maximo = max(resultados)
        vencedor = resultados[maximo]
        vencedor.fit(treino_dados, treino_marcacoes)

        self.teste_real(vencedor, validacao_dados, validacao_marcacoes)

        acerto_base = max(Counter(validacao_marcacoes).values())
        taxa_de_acerto_base = 100.0 * acerto_base / len(validacao_marcacoes)
        # print("Taxa de acerto base: %f" % taxa_de_acerto_base)
        # print("Total de testes: %d" % len(validacao_dados))
        # print(vencedor)

        return vencedor

    def entende_texto(self, pergunta, textosQuebrados, stopwords, stemmer, classificacoes, tradutor):
        pergunta = pergunta.lower()
        textoQuebrado = nltk.word_tokenize(pergunta)

        valida = [stemmer.stem(
            lista) for lista in textoQuebrado if lista not in stopwords and len(lista) > 2]
        # print(valida)

        vetorDoTexto = [self.vetorizar_texto(valida, tradutor, stemmer)]
        # print(dicionario)
        # print(vetorDoTexto)

        # teste_real(vencedor, vetorDoTexto, validacao_dados)
        resposta = self.predict(self.encontra_melhor_modelo(
            stemmer, textosQuebrados, classificacoes, tradutor, stopwords), vetorDoTexto)

        return resposta

    def respondeServer(self, request):

        while(self.flag):
            user_response = request.decode("utf-8")

            if(user_response != 'tchau'):

                classificacao = pd.read_csv(
                    'responseData.csv', encoding="utf-8")
                respostas = classificacao['texto']
                marcacoes = classificacao['classificacao']

                # ordena o arquivo em ordem crescente da coluna classificação
                # ordenado = classificacao.sort_values(by=['classificacao'], ascending=True)

                numeroPergunta = self.entende_texto(user_response, self.leituraArquivo[0], self.leituraArquivo[1],
                                                    self.leituraArquivo[2], self.leituraArquivo[3], self.leituraArquivo[4])
                tipo_pergunta = numeroPergunta[0]
                # print(tipo_pergunta)

                if(tipo_pergunta == 10):
                    # 10 é uma mensagem de saudação

                    posicao_respostas_possiveis = list()

                    for i, num_pergunta in enumerate(classificacao['classificacao']):

                        if num_pergunta == 10:
                            posicao_respostas_possiveis.append(i)
                            # print(num_pergunta)
                            # print(respostas_possiveis)

                    resposta_aleatoria = random.choice(
                        posicao_respostas_possiveis)
                    return str("Mr. Morales: " + classificacao['texto'][resposta_aleatoria])

                else:
                    return str("Mr. Morales: " + classificacao['texto'].loc[tipo_pergunta])
                    print("Mr. Morales: Poderia ajudar com algo mais?")
                print(tipo_pergunta)

                # depois dos testes trocar 'userData.csv' para 'originalData.csv'
                with codecs.open('userData.csv', 'a', encoding='utf-8') as file:
                    file.write("\n" + "\"" + user_response +
                               "\"," + str(tipo_pergunta))
            else:
                return str('Mr. Morales: Até logo')
                self.flag = False
                
