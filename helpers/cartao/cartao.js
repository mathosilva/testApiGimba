const {makeRequest} = require('../main');
const pagamento = require('../../mock/pagamento/pagamento-cartao.json')
const header = require('../../mock/pagamento/headerPagamento.json')
const faker = require('faker')

async function cadastrarCartao(cadastroCartao, documento){
    return await makeRequest({
        method: 'post',
        url: `${url.base}${url.cartoes}${documento}/cartoes`,
        data: cadastroCartao,
        headers: header
    });
};
async function cadastrarCliente(cadastroCliente){
    return await makeRequest({
        method: 'post',
        url: `${url.base}${url.cartoes}`,
        data: cadastroCliente,
        headers: header
    });
};
async function buscarCliente(documento){
    return await makeRequest({
        method: 'get',
        url: `${url.base}${url.cartoes}${documento}`,
        headers: header
    });
};
async function listaCartoes(documento){
    return await makeRequest({
        method: 'get',
        url: `${url.base}${url.cartoes}${documento}/cartoes`,
        headers: header
    });
};
async function deletaCartoes(documento, idCartao){ 
    return res = await makeRequest({
        method: 'delete',
        url: `${url.base}${url.cartoes}${documento}/cartoes/${idCartao}`,
        headers: header
    });
};
module.exports ={
    cadastrarCliente,
    buscarCliente,
    listaCartoes,
    deletaCartoes,
    cadastrarCartao
}