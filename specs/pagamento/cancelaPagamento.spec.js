const {makeRequest} = require('../../helpers/main');
const cancelarPagamento = require('../../mock/pagamento/cancelarPagamento.json')
const pagamento = require('../../helpers/pagamento/pagamento')

describe('Cancelar Pagamento', ()=>{
    it('Cancelar pagamento', async()=>{
        let resPag = await pagamento.realizaPagamento()
        url.codProcessamento = resPag.body.data.codigoGatewayProcessamento
        let obter = await pagamento.obterPagamento()
        console.log(obter)
        if(obter.body.data.situacaoTransacao == "with_error" || obter.body.data.situacaoTransacao == "failed"){
            console.log(`falhou: ${resPag.body.data.codigoGatewayProcessamento}`)
            resPag = await pagamento.realizaPagamento()
            url.codProcessamento = resPag.body.data.codigoGatewayProcessamento
        }
        cancelarPagamento.valor = resPag.body.data.valorTotal
        cancelarPagamento.codigoCobranca = resPag.body.data.codigoCobranca
        let res = await pagamento.cancelaPagamento(cancelarPagamento)
        expect(res.status).toEqual(200)
        expect(res.body.success).toEqual(true)
        expect(res.body.data.valorCancelado).toEqual(resPag.body.data.valorTotal)
        expect(res.body.data.cancelado).toEqual(true)   
    });
    it('Cancelar pagamento ja cancelado', async()=>{
        // let resPag = await pagamento.realizaPagamento()
        // cancelarPagamento.valor = resPag.body.data.valorTotal
        // cancelarPagamento.codigoCobranca = resPag.body.data.codigoCobranca
        // url.codProcessamento = resPag.body.data.codigoGatewayProcessamento
        await pagamento.cancelaPagamento(cancelarPagamento)
        let res = await pagamento.cancelaPagamento(cancelarPagamento)
        expect(res.status).toEqual(400)
        expect(res.body.success).toEqual(false)
        expect(res.body.error[0]).toEqual("Pagamento já cancelado")
    });
    it('Cancelar pagamento inválido', async()=>{ 
        url.codProcessamento = '234'
        cancelarPagamento.valor = 11.00
        cancelarPagamento.codigoCobranca = '234'
        let res = await pagamento.cancelaPagamento(cancelarPagamento)
        expect(res.status).toEqual(400)
        expect(res.body.success).toEqual(false)
        expect(res.body.error[0]).toEqual("Cobrança não encontrada")
    });
    it('Cancelar pagamento sem preencher o valor', async()=>{
        let resPag = await pagamento.realizaPagamento()
        url.codProcessamento = resPag.body.data.codigoGatewayProcessamento
        let obter = await pagamento.obterPagamento()
        console.log(obter)
        if(obter.body.data.situacaoTransacao == "with_error" || obter.body.data.situacaoTransacao == "failed"){
            console.log(`falhou: ${resPag.body.data.codigoGatewayProcessamento}`)
            resPag = await pagamento.realizaPagamento()
            url.codProcessamento = resPag.body.data.codigoGatewayProcessamento
        }
        cancelarPagamento.codigoCobranca = resPag.body.data.codigoCobranca
        let valor = resPag.body.data.valorTotal
        cancelarPagamento.valor = null
        let res = await pagamento.cancelaPagamento(cancelarPagamento)
        expect(res.status).toEqual(200)
        expect(res.body.success).toEqual(true)
        expect(res.body.data.valorCancelado).toEqual(valor)
        expect(res.body.data.cancelado).toEqual(true)
    });
    it('Cancelar pagamento em partes', async()=>{
        pagamento.valor = 200.00
        let resPag = await pagamento.realizaPagamento()
        url.codProcessamento = resPag.body.data.codigoGatewayProcessamento
        let obter = await pagamento.obterPagamento()
        if(obter.body.data.situacaoTransacao == "with_error" || obter.body.data.situacaoTransacao == "failed"){
            console.log(`falhou: ${resPag.body.data.codigoGatewayProcessamento}`)
            resPag = await pagamento.realizaPagamento()
            url.codProcessamento = resPag.body.data.codigoGatewayProcessamento
        }
        cancelarPagamento.codigoCobranca  = resPag.body.data.codigoCobranca  
        cancelarPagamento.valor = 50.00
        await pagamento.cancelaPagamento(cancelarPagamento)
        let res = await pagamento.cancelaPagamento(cancelarPagamento)
        expect(res.status).toEqual(200)
        expect(res.body.success).toEqual(true)
        expect(res.body.data.valorCancelado).toEqual(100.00)
        expect(res.body.data.cancelado).toEqual(false)
    });
    it('Cancelar pagamento com valor maior que o permitido', async()=>{
        pagamento.valor = 123.45;
        let valor = 133.45 
        let resPag = await pagamento.realizaPagamento()
        url.codProcessamento = resPag.body.data.codigoGatewayProcessamento  
        let obter = await pagamento.obterPagamento()
        if(obter.body.data.situacaoTransacao == "with_error" || obter.body.data.situacaoTransacao == "failed"){
            console.log(`falhou: ${resPag.body.data.codigoGatewayProcessamento}`)
            resPag = await pagamento.realizaPagamento()
            url.codProcessamento = resPag.body.data.codigoGatewayProcessamento
        }
        cancelarPagamento.codigoCobranca = resPag.body.data.codigoCobranca       
        cancelarPagamento.valor = valor
        let res = await pagamento.cancelaPagamento(cancelarPagamento)
        expect(res.status).toEqual(400)
        expect(res.body.success).toEqual(false)
        expect(res.body.error[0]).toEqual(`Valor superior ao permitido para cancelamento. Valor permitido: R$ 123,45`)
    });
});