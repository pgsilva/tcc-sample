package dev.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import dev.dto.UserDTO;
import dev.entity.User;
import dev.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepo;

	public List<UserDTO> listaUsuarios() {
		List<User> users = userRepo.findAll();
		List<UserDTO> form = new ArrayList<>();

		if (!CollectionUtils.isEmpty(users)) {
			for (User u : users) {
				UserDTO dto = new UserDTO();
				BeanUtils.copyProperties(u, dto);
				dto.setId(u.getId());
				form.add(dto);
			}
		}
		return form;
	}

	public User cadastrarUser(UserDTO form) {
		User user = new User();
		
		BeanUtils.copyProperties(form, user);
		userRepo.save(user);
		return user;
	}
	
	public void gerarAcesso(UserDTO form) {
		if(form.getMail()!=null && form.getName()!=null) {
			
		}
		
	}
}
