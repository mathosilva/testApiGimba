const dataPagamento = require('../../mock/pagamento/pagamento-cartao.json')
var pagamento = require('../../helpers/pagamento/pagamento')

describe('Pagamento', ()=>{
    it('Realizar pagamento', async()=>{
        let valor = 123.45;
        let msgSucesso = "Transação capturada com sucesso";
        
        let res = await pagamento.realizaPagamento()
        let body = res.body;
        expect(res.status).toEqual(200);
        expect(body.data.valorTotal).toEqual(valor);
        expect(body.data.mensagemAdquirencia).toEqual(msgSucesso);
        expect(body.success).toEqual(true);
    });
    it('Realizar pagamento com numero de parcelas igual a 0', async()=>{
        let parcelas = 1;
        dataPagamento.parcelas = 0;
        let res = await pagamento.realizaPagamento()
        let body = res.body;
        expect(res.status).toEqual(400);
        expect(body.error[0]).toEqual("'Parcelas' deve ser superior a '0'.")
        dataPagamento.parcelas = parcelas;
    });
    it('Realizar pagamento sem documento', async()=>{
        let documento = '381.579.998-80'
        dataPagamento.cliente.documento = ''
        let res = await pagamento.realizaPagamento()
        let body = res.body;
        expect(res.status).toEqual(400);
        expect(body.error[0]).toEqual("O CPF é inválido!")
        dataPagamento.cliente.documento = documento
    });
    it('Realizar pagamento sem nome', async()=>{
        let nome = 'Marcus Ferrari Teste POC'
        dataPagamento.cliente.nome = ''
        let res = await pagamento.realizaPagamento()
        let body = res.body;
        expect(res.status).toEqual(400);
        expect(body.error[0]).toEqual("'Nome' deve ser informado.")
        dataPagamento.cliente.nome = nome
    });
    it('Realizar pagamento sem email', async()=>{
        let email = 'marcus1@mailinator.com'
        dataPagamento.cliente.email = ''
        let res = await pagamento.realizaPagamento()
        let body = res.body;
        expect(res.status).toEqual(400);
        expect(body.error[0]).toEqual("'Email' é um endereço de email inválido.")
        dataPagamento.cliente.email = email
    });
    it('Realizar pagamento com cep que possui menos de 8 caracteres', async()=>{
        let cep = '05756320'
        dataPagamento.cliente.endereco.cep = '0575632'
        let res = await pagamento.realizaPagamento()
        let body = res.body;
        expect(res.status).toEqual(400);
        expect(body.error[0]).toEqual("'CEP' deve ser maior ou igual a 8 caracteres. Você digitou 7 caracteres.");
        dataPagamento.cliente.endereco.cep = cep
    });
    it('Realizar pagamento com cep que possui mais de 9 caracteres', async()=>{
        let cep = '05756320'
        dataPagamento.cliente.endereco.cep = '05756-3200'
        let res = await pagamento.realizaPagamento()
        let body = res.body
        expect(res.status).toEqual(400);
        expect(body.error[0]).toEqual("'CEP' deve ser menor ou igual a 9 caracteres. Você digitou 10 caracteres.")
        dataPagamento.cliente.endereco.cep = cep
    });
    it('Realizar pagamento sem numero de cartão de credito', async()=>{
        let numCartao = '4000000000000010';
        dataPagamento.cartao.numeroCartao = '';
        let res = await pagamento.realizaPagamento()
        let body = res.body
        expect(res.status).toEqual(400);
        expect(body.error[0]).toEqual("'Numero' deve ser informado.")
        dataPagamento.cartao.numeroCartao = numCartao;
    });
    it('Realizar pagamento sem cvv', async()=>{
        let cvv = '123';
        dataPagamento.cartao.cvv = '';
        let res = await pagamento.realizaPagamento()
        expect(res.status).toEqual(400);
        expect(res.body.error[0]).toEqual("'Cvv' deve ser informado.")
        dataPagamento.cartao.cvv = cvv;
    });
    it('Realizar pagamento sem nome Impresso', async()=>{
        let nome = 'Marcus Ferrari'
        dataPagamento.cartao.nomeImpresso = '';
        let res = await pagamento.realizaPagamento()
        expect(res.status).toEqual(400);
        expect(res.body.error[0]).toEqual("'Nome Impresso' deve ser informado.")
        dataPagamento.cartao.nomeImpresso = nome
    });
    it('Realizar pagamento com o ano anterior ao atual', async()=>{
        let now = new Date;
        let anoPassado = (now.getFullYear()) - 1;
        dataPagamento.cartao.anoExpiracao = anoPassado;
        let res = await pagamento.realizaPagamento()
        expect(res.status).toEqual(400);
        expect(res.body.error[0]).toEqual("'Ano Expiracao' deve ser superior ou igual a '2020'.")
        dataPagamento.cartao.anoExpiracao = (now.getFullYear) + 7;
    });
    it('Realizar pagamento com o mes anterior', async()=>{
        let now = new Date;
        let mesPassado =  (now.getMonth() == 0)? 12: (now.getMonth());
        let ano = (now.getMonth() == 0)? (now.getFullYear()) -1: (now.getFullYear());
        let msgErro = (now.getMonth() == 0)? `'Ano Expiracao' deve ser superior ou igual a '${now.getFullYear()}'."`:`'Mes Expiracao' deve ser superior ou igual a '${now.getMonth() + 1}'.`; 
        dataPagamento.cartao.anoExpiracao = ano;
        dataPagamento.cartao.mesExpiracao = mesPassado;
        let res = await pagamento.realizaPagamento()
        expect(res.status).toEqual(400);
        expect(res.body.error[0]).toEqual(msgErro)
        dataPagamento.cartao.anoExpiracao = now.getFullYear() + 7;
        dataPagamento.cartao.mesExpiracao = now.getMonth() + 1;

    });
    it('Realizar pagamento com mais caracteres em pais', async()=>{
        let pais = 'String'
        dataPagamento.cliente.endereco.pais = pais
        let res = await pagamento.realizaPagamento()
        expect(res.status).toEqual(400);
        expect(res.body.error[0]).toEqual("'Pais' deve ter no máximo 2 caracteres. Você digitou 6 caracteres.");
        pais = 'BR';
        dataPagamento.cliente.endereco.pais = pais;
    });
    it('Realizar pagamento com mais caracteres na uf', async()=>{
        let uf = 'String'
        dataPagamento.cliente.endereco.uf = uf
        let res = await pagamento.realizaPagamento()
        expect(res.status).toEqual(400);
        expect(res.body.error[0]).toEqual("'UF' deve ter no máximo 2 caracteres. Você digitou 6 caracteres.");
        uf = 'SP'
        dataPagamento.cliente.endereco.uf = uf
    });
});