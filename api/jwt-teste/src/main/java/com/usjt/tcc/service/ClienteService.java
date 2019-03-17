package com.usjt.tcc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.usjt.tcc.model.Cliente;
import com.usjt.tcc.model.enums.Perfil;
import com.usjt.tcc.repository.ClienteRepository;

@Service
public class ClienteService {
	
	@Autowired
	private ClienteRepository repository;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	public void insert(Cliente cliente) {
		cliente.setSenha(encoder.encode(cliente.getSenha()));
		repository.save(cliente);
	}

	public void insertAdmin(Cliente cliente) {
		cliente.addPerfil(Perfil.ADMIN);
		cliente.setSenha(encoder.encode(cliente.getSenha()));
		repository.save(cliente);		
	}

}
