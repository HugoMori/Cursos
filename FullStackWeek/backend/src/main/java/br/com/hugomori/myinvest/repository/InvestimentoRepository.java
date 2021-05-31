package br.com.hugomori.myinvest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.hugomori.myinvest.domain.Investimento;

public interface InvestimentoRepository extends JpaRepository<Investimento, Long>{

}
