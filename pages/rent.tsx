import React from 'react'
import { Contact } from '@components/home/Contact'
import { styled } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'

const phones = ['+38 (044) 247-57-48', '+38 (044) 247-57-49']

const Rent = () => {
  const { t } = useTranslation('rent')

  return (
    <div>
      <Contact
        component={
          <RentBox>
            <Upper>{t('title')}:</Upper>
            {phones.map((phone) => (
              <Number key={phone}>{phone}</Number>
            ))}
          </RentBox>
        }
      />
    </div>
  )
}

const RentBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  background: '$ads',
  position: 'relative',
  height: '328px',
  width: 'calc(100% - 16px)',
  margin: '172px auto 0 auto',

  '@md': {
    width: 'calc(100% - 128px)',
    height: '400px'
  },

  '@lg': {
    marginTop: 356,
    height: 526,
    width: 580,
    order: 2
  }
})

const Upper = styled('div', {
  borderRadius: '8px',
  textAlign: 'center',
  paddingTop: '32px',
  overflow: 'hidden',
  fontSize: '24px',
  lineHeight: '36px',
  color: '$accent',
  height: '136px',
  background: '$rent',

  '@md': { padding: '33px 130px 0 130px' },

  '@lg': {
    height: '184px',
    paddingTop: 56
  }
})

const Number = styled('div', {
  margin: '32px auto 0 auto',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  letterSpacing: '-0.01em',
  fontSize: '32px',
  lineHeight: '24px',
  color: '$accent',
  fontWeight: '350',
  height: '64px',

  '&:nth-child(3)': {
    marginTop: 0
  },

  '@md': {
    marginTop: 48,
    fontSize: '48px',
    lineHeight: '24px',

    '&:nth-child(3)': {
      marginTop: 32
    }
  },

  '@lg': {
    marginTop: 66,
    fontSize: '52px',
    lineHeight: '24px',

    '&:nth-child(3)': {
      marginTop: 48
    }
  }
})

export default Rent
