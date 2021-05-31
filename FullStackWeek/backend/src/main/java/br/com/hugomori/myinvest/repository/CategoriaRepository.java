package br.com.hugomori.myinvest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.hugomori.myinvest.domain.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{

}
