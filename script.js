document.getElementById('convert-button').addEventListener('click', async function () {
    const fileInput = document.getElementById('file-input');
    const nftName = document.getElementById('nft-name').value;
    const nftDescription = document.getElementById('nft-description').value;
    const walletAddress = document.getElementById('wallet-address').value;
  
    if (fileInput.files.length === 0) {
        alert('Please select a file to upload.');
        return;
    }
  
    const fileToUpload = fileInput.files[0];
  
    const form = new FormData();
    form.append('file', fileToUpload);
  
    const options = {
        method: 'POST',
        body: form,
        headers: {
            "Authorization": "94fe99dc-3711-40a3-8aed-81c52e5b7648",
        },
    };
  
    try {
        const response = await fetch("https://api.nftport.xyz/v0/mints/easy/files?" + new URLSearchParams({
            chain: 'polygon',
            name: nftName,
            description: nftDescription,
            mint_to_address: walletAddress,
        }), options);
  
        const responseJson = await response.json();
  
        // Handle the response
        document.getElementById('response-text').textContent = JSON.stringify(responseJson, null, 2);
  
        // Display various fields in boxes
        document.getElementById('chain-box').textContent = `Chain: ${responseJson.chain}`;
        document.getElementById('contract-address-box').textContent = `Contract Address: ${responseJson.contract_address}`;
        document.getElementById('transaction-hash-box').textContent = `Transaction Hash: ${responseJson.transaction_hash}`;
        document.getElementById('transaction-external-url-box').textContent = `Transaction URL: ${responseJson.transaction_external_url}`;
        document.getElementById('mint-to-address-box').textContent = `Mint To Address: ${responseJson.mint_to_address}`;
  
        if (responseJson.response === "OK") {
            // If NFT minting is successful, show a pop-up notification
            alert("NFT Mint Successful!");
        }
    } catch (error) {
        console.error(error);
    }
});
