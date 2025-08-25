const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuração da conexão com o MySQL Railway
const isProduction = process.env.NODE_ENV === 'production';
const isRailwayHost = process.env.DB_HOST && (process.env.DB_HOST.includes('railway') || process.env.DB_HOST.includes('proxy.rlwy'));

// Configuração otimizada para Railway
const dbConfig = {
    host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
    user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
    database: process.env.DB_NAME || process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || 'railway',
    port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT) || 3306,
    timezone: '+00:00',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // SSL obrigatório para Railway
    ssl: isRailwayHost ? { rejectUnauthorized: false } : false,
    connectTimeout: 60000,
    // Configurações específicas para Railway
    multipleStatements: true,
    dateStrings: true
};

// Criar pool de conexões
const pool = mysql.createPool(dbConfig);

// Função para testar a conexão
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexão com MySQL estabelecida com sucesso!');
        console.log(`📍 Conectado em: ${dbConfig.host}:${dbConfig.port}`);
        console.log(`💾 Banco de dados: ${dbConfig.database}`);
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Erro ao conectar com MySQL:', error.message);
        
        // Se for timeout, pode ser que o serviço esteja "dormindo"
        if (error.message.includes('ETIMEDOUT')) {
            console.log('💡 O serviço MySQL pode estar em standby. Ele será ativado automaticamente no Railway.');
        }
        
        return false;
    }
}

// Função para executar queries
async function executeQuery(query, params = []) {
    try {
        const [results] = await pool.execute(query, params);
        return results;
    } catch (error) {
        console.error('Erro ao executar query:', error);
        throw error;
    }
}

// Função para gerar código único alfanumérico
function generateUniqueCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

module.exports = {
    pool,
    testConnection,
    executeQuery,
    generateUniqueCode
};
