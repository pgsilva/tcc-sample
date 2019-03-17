package com.usjt.tcc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.usjt.tcc.model.Cliente;
import com.usjt.tcc.service.ClienteService;

@RestController
@RequestMapping(value = "/clientes")
public class ClienteController {
	
	@Autowired
	private ClienteService service;
	
	@PostMapping
	public ResponseEntity<Void> createCliente(@RequestBody Cliente cliente) {
		service.insert(cliente);
		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN')")
	@PostMapping("/admin")
	public ResponseEntity<Void> createClienteAdmin(@RequestBody Cliente cliente) {
		service.insertAdmin(cliente);
		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}

}
