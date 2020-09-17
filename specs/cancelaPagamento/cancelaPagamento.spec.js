const {makeRequest} = require('../../helpers/main');
const cancelarPagamento = require('../../mock/pagamento/cancelarPagamento.json')
const pagamento = require('../../mock/pagamento/pagamento-cartao.json')
const header = require('../../mock/pagamento/headerPagamento.json')
var codProcessamentoRepetido;
var valorCobranca;


describe('Cancelar Pagamento', ()=>{
    it('Cancelar pagamento', async()=>{
        let resPag = await makeRequest({
            method: 'post',
            url: `${url.base}`,
            data: pagamento,
            headers: header
        })
        let processamento = resPag.body.data.codigoGatewayProcessamento
        valorCobranca = resPag.body.data.valorTotal
        cancelarPagamento.valor = valorCobranca
        let res = await makeRequest({
            method: 'put',
            url: `${url.base}${processamento}`,
            data: cancelarPagamento,
            headers: header
        });
        codProcessamentoRepetido = processamento
        expect(res.status).toEqual(200)
        expect(res.body.success).toEqual(true)
        expect(res.body.data.valorCancelado).toEqual(valorCobranca)
        expect(res.body.data.cancelado).toEqual(true)
    });
    it('Cancelar pagamento inválido', async()=>{
        let processamento = '234'
        cancelarPagamento.valor = 11.00
        let res = await makeRequest({
            method: 'put',
            url: `${url.base}${processamento}`,
            data: cancelarPagamento,
            headers: header
        });
        expect(res.status).toEqual(400)
        expect(res.body.success).toEqual(false)
        expect(res.body.error[0]).toEqual("CodigoGatewayProcessamento inválido")
    });
    it('Cancelar pagamento ja cancelado', async()=>{
        let processamento = codProcessamentoRepetido
        cancelarPagamento.valor = valorCobranca
        await makeRequest({
            method: 'put',
            url: `${url.base}${processamento}`,
            data: cancelarPagamento,
            headers: header
        });
        let res = await makeRequest({
            method: 'put',
            url: `${url.base}${processamento}`,
            data: cancelarPagamento,
            headers: header
        });
        expect(res.status).toEqual(400)
        expect(res.body.success).toEqual(false)
        expect(res.body.error[0]).toEqual("Pagamento já cancelado")
    });
    it('Cancelar pagamento sem preencher o valor', async()=>{
        let resPag = await makeRequest({
            method: 'post',
            url: `${url.base}`,
            data: pagamento,
            headers: header
        })
        let processamento = resPag.body.data.codigoGatewayProcessamento
        let valor = resPag.body.data.valorTotal
        
        cancelarPagamento.valor = null
        let res = await makeRequest({
            method: 'put',
            url: `${url.base}${processamento}`,
            data: {},
            headers: header
        });
        console.log(`Sem valor: ${res}`)
        expect(res.status).toEqual(200)
        expect(res.body.success).toEqual(true)
        expect(res.body.data.valorCancelado).toEqual(valor)
        expect(res.body.data.cancelado).toEqual(true)
    });
    it('Cancelar pagamento em partes', async()=>{
        pagamento.valor = 200.00
        let resPag = await makeRequest({
            method: 'post',
            url: `${url.base}`,
            data: pagamento,
            headers: header
        })
        let processamento = resPag.body.data.codigoGatewayProcessamento
        
        cancelarPagamento.valor = 50.00
        await makeRequest({
            method: 'put',
            url: `${url.base}${processamento}`,
            data: cancelarPagamento,
            headers: header
        });
        let res = await makeRequest({
            method: 'put',
            url: `${url.base}${processamento}`,
            data: cancelarPagamento,
            headers: header
        });
        console.log(res)
        expect(res.status).toEqual(200)
        expect(res.body.success).toEqual(true)
        expect(res.body.data.valorCancelado).toEqual(100.00)
        expect(res.body.data.cancelado).toEqual(false)
        pagamento.valor = 123.45;
    });
    it('Cancelar pagamento com valor maior que o permitido', async()=>{
        let valor = 133.45
        let resPag = await makeRequest({
            method: 'post',
            url: `${url.base}`,
            data: pagamento,
            headers: header
        })
        let processamento = resPag.body.data.codigoGatewayProcessamento
        
        cancelarPagamento.valor = valor
        let res = await makeRequest({
            method: 'put',
            url: `${url.base}${processamento}`,
            data: cancelarPagamento,
            headers: header
        });
        console.log(res)
        expect(res.status).toEqual(400)
        expect(res.body.success).toEqual(false)
        expect(res.body.error[0]).toEqual(`Valor superior ao permitido para cancelamento. Valor permitido: R$ 123,45`)
    });
});