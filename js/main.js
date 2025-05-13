import Tonconnect, { TonConnect } from "@tonconnect/sdk"
document.addEventListener("DOMContentLoaded", function () {
  const tg = window.Telegram.WebApp;
  tg.ready();

  //initialize icons
  lucide.createIcons();

  if (tg.initDataUnsafe?.user) {
    const user = tg.initDataUnsafe.user;
    document.getElementById("username").innerText = "Username: @" + (user.username || "unknown");
  }

  //add click event listners to all buttons with data-tab attribute

  document.querySelectorAll('button[data-tab]').forEach(button => {
    button.addEventListener('click', function () {
        const tab = 
        this.getAttribute('data-tab');
        switchTab(tab);
    });
  });
});


//nft staking
document.getElementById('stakeNFTBtn')?.addEventListener('click', stakeNFT);

function switchTab(tab) {
  console.log(`Switching to tab: ${tab}`); // Debug line

  // Remove 'active' class from all main sections
  document.querySelectorAll('.main').forEach(div => div.classList.remove('active'));

  // Add 'active' class to the targeted section
  const targetSection = document.getElementById(tab);
  if (targetSection) {
    targetSection.classList.add('active');
  } else {
    console.warn('No section found for tab: ${tab}');
  }

  // Update active state of nav buttons
  document.querySelectorAll(`.footer button`).forEach(btn => btn.classList.remove('active'));

  const activeBtn = document.querySelector(`.footer button[data-tab="${tab}"]`);
  
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Refresh icons
  lucide.createIcons();
}

async function connectWallet() {
  try {
    const wallets = await
    tonConnect.getWallets();
    console.log("Available wallets:", wallets);

    if (wallets.length === 0) {
      alert("no wallet found. please install ton wallet.");
      return;
    }

    const wallet = wallets[0]; //select first wallet

    const session = await
    tonConnect.connect({bridgedUrl: wallet.bridgedUrl});

    console.log("Connect wallet address:", session.wallet.address);

    document.getElementById("walletAddress").innerText = session.wallet.address;

    //fetch balance (assuming ton sdk provide a method for it)
    const balance = await
    tonConnect.getBalance(session.wallet.address);

    document.getElementById("walletBalance").innerText = '${balance} TON';
  
  } catch (error) {
    console.error("Error connecting wallet:", error);
    alert("error connecting wallet");

  }
  }

  //attach event listner
  document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
  });

async function stakeNFT() {
  console.log("Staking NFT...");
  const walletAddress = document.getElementById("walletAddress").innerText;
  if (walletAddress === "Not connected") {
    alert("Please connect your wallet first.");
    return;
  }

  const nftId = document.getElementById("nftIdInput").value.trim();
  if (!nftId) {
    alert("Enter NFT ID to stake");
    return;
  }

  console.log('Staking NFT with ID: ${nftid}');
  document.getElementById("stakedNFTs").innerHTML += '<li>Staked NFT ID: ${nftid}</li>';

  //add to staked nft list
  stakeNFTs.push(nftId);

  //update the UI
  const stakedNFTsContainer = document.getElementById("stakedNFTs");
  stakedNFTsContainer.innerHTML = "";
  stakedNFTs.forEach(id => {
    stakedNFTsContainer.innerHTML += '<li>Staked NFT ID: ${id}</li>';
  });

  alert('NFT ${nftId} staked sucessfully!');
  
}

function completeTask(taskId) {
  console.log("Task completed:", taskId);
}