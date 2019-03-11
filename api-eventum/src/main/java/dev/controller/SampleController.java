package dev.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dev.dto.UserAutorizeDTO;
import dev.dto.UserDTO;
import dev.entity.User;
import dev.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class SampleController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/user/buscar", method = RequestMethod.GET)
	public ResponseEntity<List<UserDTO>> buscarUsuarios() {
		try {
			List<UserDTO> listUsers = userService.listaUsuarios();
			return new ResponseEntity<>(listUsers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "api/user/novo", method = RequestMethod.POST)
	public ResponseEntity<Integer> cadastrarUsuario(@RequestBody UserDTO form) {
		try {
			User u = userService.cadastrarUser(form);
			return new ResponseEntity<>(u.getId(), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<String> login(@RequestBody UserAutorizeDTO login) throws ServletException {
		try {
			return new ResponseEntity<>(Jwts.builder().setSubject(login.getUser()).claim("roles", "user")
					.setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256, "secretkey").compact(), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "api/login/user", method = RequestMethod.GET)
	public ResponseEntity<String> loginAutorize() {
		try {
			String msg = new String("Usuario autenticado");
			return new ResponseEntity<>(msg, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
