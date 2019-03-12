import React from 'react';
import { bool, object, string } from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';

import PayoutDetailsAddress from './PayoutDetailsAddress';
import PayoutDetailsPersonalDetails from './PayoutDetailsPersonalDetails';

import css from './PayoutDetailsForm.css';

const PayoutDetailsAccountOpener = props => {
  const {
    fieldId,
    country,
    disabled,
    form,
    intl,
    showEmailField,
    showOrganizationTitleField,
    showOwnerField,
    showPersonalAddressField,
    showPersonalIdNumberField,
    showPhoneNumberField,
    values,
  } = props;

  return (
    <div className={css.accountOpenerWrapper}>
      <div className={css.accountOpenerInputsWrapper}>
        <PayoutDetailsPersonalDetails
          accountType="company"
          country={country}
          disabled={disabled}
          fieldId={fieldId}
          intl={intl}
          showEmailField={showEmailField}
          showOrganizationTitleField={showOrganizationTitleField}
          showOwnerField={showOwnerField}
          showOwnershipPercentageField={showOwnerField && values && values[fieldId] && values[fieldId].role && values[fieldId].role.find(r => r === 'owner')}
          showPersonalIdNumberField={showPersonalIdNumberField}
          showPhoneNumberField={showPhoneNumberField}
          sectionTitle={intl.formatMessage({ id: 'PayoutDetailsForm.accountOpenerTitle' })}
          values={values}
        />
        {showPersonalAddressField ? (
          <PayoutDetailsAddress
            className={css.personalAddressContainer}
            country={country}
            disabled={disabled}
            fieldId={`${fieldId}.address`}
            form={form}
            intl={intl}
          />
        ) : null}
      </div>

      <p className={css.accountOpenerInfo}>
        <FormattedMessage id="PayoutDetailsForm.accountOpenerInfoText" />
      </p>
    </div>
  );
};

PayoutDetailsAccountOpener.defaultProps = {
  disabled: false,
  showPersonalAddressField: false,
  values: null,
};

PayoutDetailsAccountOpener.propTypes = {
  country: string.isRequired,
  fieldId: string.isRequired,
  form: object.isRequired,
  disabled: bool,
  showPersonalAddressField: bool,
  values: object,

  // from parent
  intl: intlShape.isRequired,
};

export default PayoutDetailsAccountOpener;
