// Script de teste para verificar se o POST está funcionando
import 'dotenv/config';

const API_BASE = 'http://localhost:3001';

const testData = {
  nome: 'Teste',
  cpf: '12345678901',
  email: 'teste@teste.com',
  telefone: '11999999999',
  endereco: 'Rua Teste, 123',
  senha: '123456',
  active: true
};

console.log('🧪 Testando POST /usuarios...');
console.log('📤 Dados:', JSON.stringify(testData, null, 2));
console.log('');

try {
  const response = await fetch(`${API_BASE}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  });

  console.log('✅ Status:', response.status, response.statusText);
  console.log('✅ Headers:', Object.fromEntries(response.headers.entries()));
  
  const data = await response.json();
  console.log('✅ Resposta:', JSON.stringify(data, null, 2));
  
  if (response.ok) {
    console.log('');
    console.log('🎉 Teste passou! O backend está funcionando corretamente.');
  } else {
    console.log('');
    console.log('❌ Teste falhou. Erro:', data.error);
  }
} catch (error) {
  console.error('❌ Erro ao fazer requisição:', error.message);
  console.error('Stack:', error.stack);
  console.log('');
  console.log('💡 Verifique se:');
  console.log('   1. O backend está rodando (npm run dev)');
  console.log('   2. A URL está correta:', API_BASE);
  console.log('   3. Não há firewall bloqueando');
}

