import { BankStatic } from '../../api/bank/models/bank.model'
import { LoanStatic } from '../../api/loan/models/loan.model'
import { LoanTypeStatic } from '../../api/loan/models/loan.type.model'
import { TeaPenStatic } from '../../api/tea/models/tea.pen.model'
import { TeaUsdStatic } from '../../api/tea/models/tea.usd.model'
import { LoanLinkStatic } from '../../api/loan/models/loan.link.model'
import { LoanLinkContentStatic } from '../../api/loan/models/loan.link.content.model'

export const loanLinkContentHasManyLoanLink = ({
  loanLink,
  loanLinkContent,
}: {
  loanLink: LoanLinkStatic
  loanLinkContent: LoanLinkContentStatic
}): void => {
  loanLink.hasMany(loanLinkContent, {
    foreignKey: { name: 'id_loan_link', allowNull: true },
    sourceKey: 'id',
  })
  loanLinkContent.belongsTo(loanLink, {
    foreignKey: { name: 'id_loan_link', allowNull: true },
    targetKey: 'id',
  })
}

export const LoanHasManyLoanLinkContent = ({
  loan,
  loanLinkContent,
}: {
  loan: LoanStatic
  loanLinkContent: LoanLinkContentStatic
}): void => {
  loan.hasMany(loanLinkContent, {
    foreignKey: { name: 'id_loan', allowNull: true },
    sourceKey: 'id',
  })
  loanLinkContent.belongsTo(loan, {
    foreignKey: { name: 'id_loan', allowNull: true },
    targetKey: 'id',
  })
}

export const loanTypeHasManyLoan = ({
  loan,
  loan_type,
}: {
  loan: LoanStatic
  loan_type: LoanTypeStatic
}): void => {
  loan_type.hasMany(loan, {
    foreignKey: { name: 'loan_type_id', allowNull: true },
    sourceKey: 'id',
  })
  loan.belongsTo(loan_type, {
    foreignKey: { name: 'loan_type_id', allowNull: true },
    targetKey: 'id',
  })
}
export const bankHasManyLoan = ({ loan, bank }: { loan: LoanStatic; bank: BankStatic }): void => {
  bank.hasMany(loan, {
    foreignKey: { name: 'bankId', allowNull: true },
    sourceKey: 'id',
  })
  loan.belongsTo(bank, {
    foreignKey: { name: 'bankId', allowNull: true },
    targetKey: 'id',
  })
}
export const LoanHasManyTeaPen = ({ loan, tea_pen }: { loan: LoanStatic; tea_pen: TeaPenStatic }): void => {
  loan.hasMany(tea_pen, {
    foreignKey: { name: 'loanId', allowNull: false },
    sourceKey: 'id',
  })
  tea_pen.belongsTo(loan, {
    foreignKey: { name: 'loanId', allowNull: false },
    targetKey: 'id',
  })
}
export const LoanHasManyTeaUsd = ({ loan, tea_usd }: { loan: LoanStatic; tea_usd: TeaUsdStatic }): void => {
  loan.hasMany(tea_usd, {
    foreignKey: { name: 'loanId', allowNull: false },
    sourceKey: 'id',
  })
  tea_usd.belongsTo(loan, {
    foreignKey: { name: 'loanId', allowNull: false },
    targetKey: 'id',
  })
}
