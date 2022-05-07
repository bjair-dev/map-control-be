import { UserStatic } from '../../api/user/models/user.model'
import { EntryStatic } from '../../api/entry/models/entry.model'
import { UserChallengeStatic } from '../../api/user_challenge/models/user.challenge.model'
import { EntryTypeStatic } from '../../api/entry_type/models/entry.type.model'
import { PackageStatic } from '../../api/package/models/package.model'
import { AnswerStatic } from '../../api/answer/models/answer.model'

import { DepartamentoTypeStatic } from '../../api/ubicacion/models/departamento.model'

import { ProvinciaStatic } from '../../api/ubicacion/models/provincia.model'
import { DistritoStatic } from '../../api/ubicacion/models/distrito.model'

//*@DESC User has many bank accounts
export const userHasManyBankAccount = ({
  user,
  back_account,
}: {
  user: UserStatic
  back_account: BankAccountStatic
}): void => {
  user.hasMany(back_account, {
    foreignKey: 'userId',
    sourceKey: 'id',
  })
  back_account.belongsTo(user, {
    foreignKey: 'userId',
    targetKey: 'id',
  })
}
//*@DESC User has many entries
export const userHasManyEntry = ({ user, entry }: { user: UserStatic; entry: EntryStatic }): void => {
  user.hasMany(entry, {
    foreignKey: 'userId',
    sourceKey: 'id',
  })
  entry.belongsTo(user, {
    foreignKey: 'userId',
    targetKey: 'id',
  })
}

export const userHasManyAnswer = ({ user, answer }: { user: UserStatic; answer: AnswerStatic }): void => {
  user.hasMany(answer, {
    foreignKey: 'userId',
    sourceKey: 'id',
  })
  answer.belongsTo(user, {
    foreignKey: 'userId',
    targetKey: 'id',
  })
}
//*@DESC User has many entries types

// export const userHasManyEntryType = ({
//   user,
//   entry_type,
// }: {
//   user: UserStatic
//   entry_type: EntryTypeStatic
// }): void => {
//   user.hasMany(entry_type, {
//     foreignKey: 'userId',
//     sourceKey: 'id',
//   })
//   entry_type.belongsTo(user, {
//     foreignKey: 'userId',
//     targetKey: 'id',
//   })
// }

// export const userbelongsToMany = ({
//   user,
//   _package,
// }: {
//   user: UserStatic
//   _package: PackageStatic
// }): void => {
//   user.belongsToMany(_package, {
//     foreignKey: 'userId',
//     sourceKey: 'id',
//     through:'user_package'
//   })

//   _package.belongsToMany(user, {
//     foreignKey: 'packageId',
//     targetKey: 'id',
//     through:'user_package'

//   })
// }

//*@DESC User has many entries

export const userHasManyDepartamento = ({
  departamento,
  user,
}: {
  departamento: DepartamentoTypeStatic
  user: UserStatic
}): void => {
  departamento.hasMany(user, {
    foreignKey: { name: 'region_id', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  user.belongsTo(departamento, {
    foreignKey: { name: 'region_id', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}

export const userHasManyDepartamento = ({
  departamento,
  user,
}: {
  departamento: DepartamentoTypeStatic
  user: UserStatic
}): void => {
  departamento.hasMany(user, {
    foreignKey: { name: 'region_id', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  user.belongsTo(departamento, {
    foreignKey: { name: 'region_id', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}

export const userHasManyProvincia = ({
  provincia,
  user,
}: {
  provincia: ProvinciaStatic
  user: UserStatic
}): void => {
  provincia.hasMany(user, {
    foreignKey: { name: 'prov_id', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  user.belongsTo(provincia, {
    foreignKey: { name: 'prov_id', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}

export const userHasManyDistrito = ({
  distrito,
  user,
}: {
  distrito: DistritoStatic
  user: UserStatic
}): void => {
  distrito.hasMany(user, {
    foreignKey: { name: 'distrito_id', allowNull: true },
    sourceKey: 'id',
    onDelete: 'CASCADE',
  })
  user.belongsTo(distrito, {
    foreignKey: { name: 'distrito_id', allowNull: true },
    targetKey: 'id',
    onDelete: 'CASCADE',
  })
}
