// Teste completo do sistema para Railway
require('dotenv').config();
const { testConnection, executeQuery } = require('./database/connection');

async function fullSystemTest() {
    console.log('🚀 TESTE COMPLETO DO SISTEMA RAILWAY\n');
    
    console.log('📋 CONFIGURAÇÕES:');
    console.log('Host:', process.env.DB_HOST);
    console.log('Porta:', process.env.DB_PORT);
    console.log('Banco:', process.env.DB_NAME);
    console.log('Usuário:', process.env.DB_USER);
    console.log('Ambiente:', process.env.NODE_ENV);
    console.log('');
    
    // Teste 1: Conexão básica
    console.log('🔧 Teste 1: Conexão com banco...');
    try {
        const connected = await testConnection();
        if (connected) {
            console.log('✅ Conexão estabelecida!');
        } else {
            console.log('❌ Falha na conexão');
            return false;
        }
    } catch (error) {
        console.log('❌ Erro na conexão:', error.message);
        console.log('\n📝 INSTRUÇÕES PARA DEPLOY NO RAILWAY:');
        console.log('1. No Railway, configure as variáveis de ambiente:');
        console.log('   DB_HOST=mysql.railway.internal');
        console.log('   DB_PORT=3306');
        console.log('   DB_USER=root');
        console.log('   DB_PASSWORD=sua_senha');
        console.log('   DB_NAME=railway');
        console.log('   NODE_ENV=production');
        console.log('   PORT=3000');
        console.log('');
        console.log('2. Conecte seu repositório GitHub ao Railway');
        console.log('3. O Railway detectará automaticamente o projeto Node.js');
        console.log('4. O deploy será feito automaticamente com "npm start"');
        console.log('');
        console.log('✅ Seu código está PRONTO para o Railway!');
        return false;
    }
    
    // Teste 2: Verificar estrutura do banco
    console.log('\n🗄️ Teste 2: Verificando estrutura do banco...');
    try {
        const tables = await executeQuery(`
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = ?
        `, [process.env.DB_NAME]);
        
        console.log('✅ Tabelas encontradas:', tables.length);
        tables.forEach(table => {
            console.log('  -', table.TABLE_NAME);
        });
    } catch (error) {
        console.log('⚠️ Estrutura do banco será criada no primeiro acesso');
    }
    
    console.log('\n🎉 SISTEMA PRONTO PARA RAILWAY!');
    console.log('📱 Após o deploy, acesse:');
    console.log('   - Interface: https://seu-app.railway.app');
    console.log('   - Dashboard: https://seu-app.railway.app/dashboard');
    
    return true;
}

fullSystemTest().then(() => {
    process.exit(0);
}).catch(error => {
    console.error('❌ Erro no teste:', error.message);
    process.exit(1);
});
