import React from 'react';
import { bool, func, object, string } from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { ExternalLink, IconAdd, IconClose, InlineTextButton } from '../../components';

import PayoutDetailsAddress from './PayoutDetailsAddress';
import PayoutDetailsPersonalDetails from './PayoutDetailsPersonalDetails';

import css from './PayoutDetailsForm.css';

const PayoutDetailsAdditionalPersons = props => {
  const {
    fieldId,
    country,
    disabled,
    form,
    intl,
    push,
    showEmailField,
    showOrganizationTitleField,
    showOwnerField,
    showPersonalAddressField,
    showPersonalIdNumberField,
    showPhoneNumberField,
    values,
  } = props;

  const additionalPersonInfoLink = (
    <ExternalLink
      href="https://support.stripe.com/questions/owners-and-directors"
      className={css.termsLink}
    >
      <FormattedMessage id="PayoutDetailsForm.additionalPersonInfoLink" />
    </ExternalLink>
  );

  // // Show owner section if not visible yet
  // if (values && !values[fieldId]) {
  //   push(fieldId, undefined);
  // }

  return (
    <div className={css.additionalPersonsWrapper}>
      <FieldArray id={`${fieldId}`} name={`${fieldId}`}>
        {({ fields }) =>
          fields.map((name, index) => (
            <div className={css.additionalPersonWrapper} key={name}>
              <div
                className={css.fieldArrayRemove}
                onClick={() => fields.remove(index)}
                style={{ cursor: 'pointer' }}
              >
                <span className={css.additionalPersonLabel}>
                  <IconClose rootClassName={css.closeIcon} size="small" />
                  <FormattedMessage id="PayoutDetailsForm.additionalPersonRemove" />
                </span>
              </div>
              <PayoutDetailsPersonalDetails
                intl={intl}
                disabled={disabled}
                values={values}
                country={country}
                fieldId={`${fieldId}.${index}`}
                accountType="company"
                sectionTitle={intl.formatMessage({ id: 'PayoutDetailsForm.additionalPersonTitle' })}
                showEmailField={showEmailField}
                showOrganizationTitleField={showOrganizationTitleField}
                showOwnerField={showOwnerField}
                showOwnershipPercentageField={values && values[fieldId] && values[fieldId][index] && values[fieldId][index].role && values[fieldId][index].role.find(r => r === 'owner')}
                showPersonalIdNumberField={showPersonalIdNumberField}
                showPhoneNumberField={showPhoneNumberField}
                showRoleField
              />
              {showPersonalAddressField ? (
                <PayoutDetailsAddress
                  className={css.personalAddressContainer}
                  country={country}
                  intl={intl}
                  disabled={disabled}
                  form={form}
                  fieldId={`${fieldId}.${index}.address`}
                />
              ) : null}
            </div>
          ))
        }
      </FieldArray>

      <React.Fragment>
        <InlineTextButton
          type="button"
          rootClassName={css.fieldArrayAdd}
          onClick={() => push(fieldId, undefined)}
        >
          <span className={css.additionalPersonLabel}>
            <IconAdd rootClassName={css.addIcon} />
            <FormattedMessage id="PayoutDetailsForm.additionalPersonLink" />
          </span>
        </InlineTextButton>
        <p className={css.additionalPersonInfo}>
          <FormattedMessage
            id="PayoutDetailsForm.additionalPersonInfoText"
            values={{ additionalPersonInfoLink }}
          />
        </p>
      </React.Fragment>
    </div>
  );
};

PayoutDetailsAdditionalPersons.defaultProps = {
  disabled: false,
  showPersonalAddressField: false,
  values: null,
};

PayoutDetailsAdditionalPersons.propTypes = {
  country: string.isRequired,
  fieldId: string.isRequired,
  form: object.isRequired,
  disabled: bool,
  push: func.isRequired,
  showPersonalAddressField: bool,
  values: object,

  // from parent
  intl: intlShape.isRequired,
};

export default PayoutDetailsAdditionalPersons;
