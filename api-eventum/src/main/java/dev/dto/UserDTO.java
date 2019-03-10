package dev.dto;

public class UserDTO {
	
	private Integer id;
	private String name;
	private Integer age;
	private String mail;

	public UserDTO() {
	}

	public UserDTO(String name, Integer age, String mail, Integer id) {
		this.name = name;
		this.age = age;
		this.mail = mail;
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	

}
