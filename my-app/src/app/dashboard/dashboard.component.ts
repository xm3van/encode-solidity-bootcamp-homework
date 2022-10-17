import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { keccak256 } from 'ethers/lib/utils';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tokenContractAddress: string;
  tokenBallotContractAddress: string;
  tokenTotalSupply: string;
  walletAddress: string;
  wallet: ethers.Wallet | undefined;
  walletVotingPower: string;
  winningProposal: string;
  delegationReceipt: string;
  voteReceipt: string;
  etherBalance: string;
  redeemReceipt: string;
  provider: ethers.providers.BaseProvider;

  // order-details
  orderID: number;
  orderSecret: string;

  claimForm = this.fb.group({
    address: [''],
    amount: ['']
  })

  redeemForm = this.fb.group({
    oID: [],
    oSecret: [''],
    oAddress: ['']
  })

  delegationAddressForm = this.fb.group({
    address: ['']
  })

  voteForm = this.fb.group({
    proposalIndex: [''],
    amount: [''],
  })


  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.tokenContractAddress = "Loading.. ";
    this.tokenBallotContractAddress = "Loading .."
    this.tokenTotalSupply = "Loading.. ";
    this.walletAddress = "Loading.. ";
    this.walletVotingPower = "Loading.. ";
    this.winningProposal = "Loading";
    this.delegationReceipt = "";
    this.voteReceipt = " ";
    this.etherBalance = "Loading.. ";
    this.orderID = 0;
    this.orderSecret = "NaN";
    this.redeemReceipt = ""
    this.provider = ethers.getDefaultProvider("goerli")
  }

  ngOnInit(): void {
    this.apiService.getContractAddress().subscribe((response) => { this.tokenContractAddress = response.result; });
    this.apiService.getTotalSupply().subscribe((response) => { this.tokenTotalSupply = response.result + ' Tokens'; });
    this.apiService.getBallotContractAddress().subscribe((response) => { this.tokenBallotContractAddress = response.result; });
    this.apiService.getWalletAddress().subscribe((response) => { this.walletAddress = response.result; });

    // this.wallet = ethers.Wallet.createRandom();
    // this.walletAddress = this.wallet.address;
    this.apiService.getWinningProposal().subscribe((response) => { this.winningProposal = response.result; });
  }

  ngOnInit2(): void {
    this.apiService.checkVotingPower(this.walletAddress).subscribe((response) => {
      this.walletVotingPower = response.result;
    });
    this.provider.getBalance(this.walletAddress).then((balanceBn) => {
      this.etherBalance = ethers.utils.formatEther(balanceBn) + ' ETH'
    });
  }


  async fileTokenRequest() {
    const body = {
      address: this.claimForm.value.address,
      amount: this.claimForm.value.amount
    };
    console.log(body)
    this.apiService.requestTokens(body).subscribe((response) => { this.orderID = response.result.id, this.orderSecret = response.result.secret });
  }

  redeemTokenRequest() {
    const body = {
      id: this.redeemForm.value.oID,
      secret: this.redeemForm.value.oSecret,
      address: this.redeemForm.value.oAddress,
    };
    console.log(body)
    this.apiService.claimPayment(body).subscribe((response) => { this.redeemReceipt = response.result });

  }


  // doAction() {
  //   this.wallet = ethers.Wallet.createRandom();
  //   this.walletAddress = this.wallet.address;
  // }

  async delegate() {
    const body = {
      address: this.delegationAddressForm.value.address,
    };
    this.apiService.delegate(body).subscribe((response) => {
      console.log(response.result)

      this.delegationReceipt = response.result;
    });
  }


  async vote() {
    const body = {
      proposalIndex: this.voteForm.value.proposalIndex,
      amount: this.voteForm.value.amount,
    };
    console.log(body)
    this.apiService.vote(body).subscribe((response) => {
      console.log(response.result)
      this.voteReceipt = response.result;
    });
  }
  //  delegate, #DONE
  //  transfer tokens, 

  // mytokenisedballot.sol
  //  voting, # done
  //  query proposals #done 
  //  query winning proposal 

}
