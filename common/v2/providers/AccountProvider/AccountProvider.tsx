import React, { Component, createContext } from 'react';
import * as service from 'v2/services/Account/Account';
import { ExtendedAccount } from 'v2/services/Account';

export interface ProviderState {
  accounts: ExtendedAccount[];
  createAccount(accountData: ExtendedAccount): void;
  deleteAccount(uuid: string): void;
  updateAccount(uuid: string, accountData: ExtendedAccount): void;
}

export const AccountContext = createContext({} as ProviderState);

export class AccountProvider extends Component {
  public readonly state: ProviderState = {
    accounts: service.readAccounts() || [],
    createAccount: (accountData: ExtendedAccount) => {
      service.createAccount(accountData);
      this.getAccounts();
    },
    deleteAccount: (uuid: string) => {
      service.deleteAccount(uuid);
      this.getAccounts();
    },
    updateAccount: (uuid: string, accountData: ExtendedAccount) => {
      service.updateAccount(uuid, accountData);
      this.getAccounts();
    }
  };

  public render() {
    const { children } = this.props;
    return <AccountContext.Provider value={this.state}>{children}</AccountContext.Provider>;
  }

  private getAccounts = () => {
    const accounts: ExtendedAccount[] = service.readAccounts() || [];
    this.setState({ accounts });
  };
}