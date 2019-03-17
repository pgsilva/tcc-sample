package com.usjt.tcc.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/teste")
public class TestController {
	
	@RequestMapping(method = RequestMethod.GET, value = "/livre")
	public ResponseEntity<String> testePathLivreGet(){
		return ResponseEntity.ok().body("url livre");
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/livre")
	public ResponseEntity<String> testePathLivrePost(){
		return ResponseEntity.ok().body("url livre");
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/livreget")
	public ResponseEntity<String> testePathNaoLivre(){
		return ResponseEntity.ok().body("url privada");
	}
	
	@PreAuthorize("hasAnyRole('ADMIN')")
	@RequestMapping(method = RequestMethod.GET, value = "/travada")
	public ResponseEntity<String> travada(){
		return ResponseEntity.ok().body("url travada");
	}

}
