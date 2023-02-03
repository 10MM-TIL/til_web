import { ReactElement } from 'react';
import { FieldRemindContainer, FieldRemindDate, FieldRemindDesc } from './styles';
import * as Typo from '@/components/Typography';

export const FieldRemind = ({}): ReactElement => {
  return (
    <FieldRemindContainer>
      <div>
        <FieldRemindDate>
          <Typo.Label1 color='#636C78'>{'2023 11'}</Typo.Label1>
        </FieldRemindDate>
        <FieldRemindDesc>
          <Typo.SubHeader color='#E0E6EE'>{'12312312312'}</Typo.SubHeader>
        </FieldRemindDesc>
      </div>
    </FieldRemindContainer>
  );
};
