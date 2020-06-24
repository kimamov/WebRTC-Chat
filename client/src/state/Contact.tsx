import React from 'react';
import { useStateContext } from './state';

export interface IContact {
  id?: number;
  name: string;
  phone: string;
  address: string;
  isPrivate: boolean;
}

export const Contact: React.FunctionComponent<IContact> = ({ name, phone, address }) => {
      return (<React.Fragment>
        <h2>Contact {name}</h2>
        <div>
          <div>{address}</div>
          <div>{phone}</div>
        </div>
      </React.Fragment>)
}