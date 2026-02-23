import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch'; // or use native fetch if Node 18+

async function testUpload() {
    try {
        const form = new FormData();
        form.append('file', fs.createReadStream('./package.json'));
        form.append('relatedEntityType', 'TEST');
        form.append('relatedEntityId', '1');

        console.log('Sending request to http://localhost:3001/api/common/documents');
        const response = await fetch('http://localhost:3001/api/common/documents', {
            method: 'POST',
            body: form,
            headers: form.getHeaders() // Add boundary headers
        });

        const data = await response.text();
        console.log('Status:', response.status);
        console.log('Response:', data);
    } catch (e) {
        console.error('Error:', e.message);
    }
}

testUpload();
