// Script para testar conexão com Railway
require('dotenv').config();
const { testConnection } = require('./database/connection');

async function testRailwayConnection() {
    console.log('🔧 Testando conexão com Railway MySQL...');
    console.log('📍 Host:', process.env.DB_HOST);
    console.log('🔌 Porta:', process.env.DB_PORT);
    console.log('💾 Banco:', process.env.DB_NAME);
    console.log('👤 Usuário:', process.env.DB_USER);
    console.log('');
    
    try {
        const success = await testConnection();
        if (success) {
            console.log('🎉 SUCESSO! Conexão com Railway estabelecida!');
            console.log('✅ Seu projeto está pronto para funcionar no Railway!');
        } else {
            console.log('❌ ERRO: Falha na conexão');
            console.log('💡 Verifique suas credenciais no arquivo .env');
        }
    } catch (error) {
        console.error('❌ ERRO:', error.message);
        console.log('💡 Possíveis soluções:');
        console.log('   1. Verifique se as credenciais estão corretas');
        console.log('   2. Certifique-se que o banco MySQL está ativo no Railway');
        console.log('   3. Confirme se as variáveis de ambiente estão configuradas');
    }
    
    process.exit(0);
}

testRailwayConnection();
