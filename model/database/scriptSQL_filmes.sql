	#Permite criar um database
create database db_filmes_20261_b;

	#Permite visualizae todos os databases existentes 
show databases;

	#Permite escolher o database a ser utilizado
use db_filmes_20261_b;

	#Permite visualizar todas as tabelas existentes dentro do database
show tables;

create table tbl_filme (
	id 					int not null auto_increment primary key,
    nome 				varchar(85) not null,
    sinopse 			text not null,
    capa 				varchar(255) not null,
    data_lancamento 	date not null,
    duracao 			time not null,
    valor 				decimal(5,2) default 0,
    avaliacao 			decimal(3,2) default null
);

	# se caso vc queira te ferrar ou ferrar o amigo use o drop mas não é recomendado (só se quiser ferrar o amigo)

insert into tbl_filme (
	nome,
    sinopse,
    capa,
    data_lancamento,
    duracao,
    valor,
    avaliacao
) values(
	'Super Mario Galaxy: O Filme',
    
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão.
    Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados 
    embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois
    de salvar o Reino dos Cogumelos.',
    
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    
    '2026-04-02',
    
    '01:39:00',
    
    '50.60',
    
    '3'
);

select * from tbl_filme order by id desc;

	# Aqui vc seleciona qual id vc quer por meio do id
select * from tbl_filme where id = 26;

	# aqui vc podera deletar algo da tabela, mas o id sempre sera um diferente
delete from tbl_filme where id > 0;
	#Fazendo a tabela de update, ela pode ser considerada bem perigosa caso você não fale qual 
	# tabela gostaria de atualizar, ela irá mudar todos os nomes sem acessão.
	# NUNCA ESQUECER DE UTILIZAR O WHERE PARA EVITAR ERROS!!
update tbl_filme set
	nome = 'Filme 03',
    sinopse = 'teste',
    capa = 'teste.png',
    data_lancamento = '2026-04-29',
    duracao = '01:50:00',
    valor = '10',
    avaliacao = '5'
    where id = 53;