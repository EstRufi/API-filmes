	#Permite criar um database
create database db_filmes_20261_b;

	#Permite visualizae todos os databases existentes 
show databases;

	#Permite escolher o database a ser utilizado
use db_filmes_20261_b;

	#Permite visualizar todas as tabelas existentes dentro do database
show tables;

## ESTA FALTANDO O ID CLASSIFICACAO POR ISSO NÃO VAI
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
	
#insert into tbl_filme (
#	nome,
#    sinopse,
#    capa,
 #   data_lancamento,
 #   duracao,
 #   valor,
 #   avaliacao
#) values(
#	replace('Super Mario Galaxy: O Filme',"'",""),
 #   
 #   'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão.
 #   Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados 
  #  embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois
  #  de salvar o Reino dos Cogumelos.',
    
 #   'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    
 #   '2026-04-02',
    
  #  '01:39:00',
    
  #  '50.60',
    
  #  if('',null,2)
# );



	# Aqui vc seleciona qual id vc quer por meio do id
# select * from tbl_filme where id = 26;

	# aqui vc podera deletar algo da tabela, mas o id sempre sera um diferente
# delete from tbl_filme where id = 28;
	#Fazendo a tabela de update, ela pode ser considerada bem perigosa caso você não fale qual 
	# tabela gostaria de atualizar, ela irá mudar todos os nomes sem acessão.
	# NUNCA ESQUECER DE UTILIZAR O WHERE PARA EVITAR ERROS!!
#update tbl_filme set
#	nome = 'Texte Numero 10',
#    sinopse = 'teste',
#    capa = 'teste.png',
#    data_lancamento = '2026-04-29',
#    duracao = '01:50:00',
 #   valor = '10',
 #   avaliacao = '5'
 #   where id = 27;
 
 create table tbl_genero (
	id int not null auto_increment primary key,
    nome varchar(30) not null
 );
 
 insert into tbl_genero(
	nome
 )values(
 replace('drama',"'","")
 );
 
 create table tbl_filme_genero(
	id int not null auto_increment primary	key,
    id_filme int not null,
    id_genero int not null,
    
    constraint FK_FILME_FILMEGENERO
    foreign key (id_filme)
    references tbl_filme(id),
    
    constraint FK_GENERO_FILMEGENERO
    foreign key (id_genero)
    references tbl_genero(id)
    
 );

# delete from tbl_genero where id = 1;
 
	# CLassificacao
create table tbl_classificacao(
	id int not null auto_increment primary key,
    classificacao_filme varchar(15) not null
);

insert into tbl_classificacao(
	classificacao_filme
)value(
	replace('+18',"'","")
);

insert into tbl_classificacao(
	        classificacao_filme
        )value(
	        '+16'
        );

# realiando trigger
DELIMITER $
#Realizando a criação
	create trigger trg_delete_filmes_genero
#Aqui o before é uma ação que quero na tabela antes, mas se for depois pode usar "after" e o on é como se fosse nosso "o"
		before delete on tbl_filme
# aqui fala se cada linha da tabela irei fazer uma ação
			for each row
            BEGIN
#aqui falo de qual tabela tbm vou mecher(intermediaria), quando vou mecher tenho que colocar no final se o id ira muda(no caso aqui antes de eu deleter por conta do old, se fosse depois era new)
				delete from tbl_filme_genero where id_filme = old.id;
# end é o fim (cabooo)
END $

            
#show triggers; ver as triggers que tenho


select * from tbl_classificacao order by id desc;


select * from tbl_filme order by id desc;


 select tbl_genero.*
                from tbl_filme
                    inner join tbl_filme_genero
                        on tbl_filme.id = tbl_filme_genero.id_filme
                    inner join tbl_genero
                        on tbl_genero.id = tbl_filme_genero.id_genero
                where tbl_filme.id = 13 ;
                
create table tbl_nacionalidade(
	id int not null auto_increment primary key,
    nacionalidade varchar(30) not null
);

create table tbl_sexo(
	id int not null auto_increment primary key,
    sexo varchar(20) not null
);
create table tbl_cargo(
	id int not null auto_increment primary key,
    atividade varchar(80) not null
);

create table tbl_profissional(
	id int not null auto_increment primary key,
    nome varchar(85) not null,
    nome_nascimento varchar(85) default null,
    data_nascimento date not null,
    biografia text not null,
    data_morte date default null,
    data_inicio_carreira date not null,
    foto varchar(256) not null,
    id_sexo int not null,
    
    constraint FK_SEXO_FILME
    foreign key (id_sexo)
    references tbl_sexo(id)
);