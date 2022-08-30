import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { IconAlertCircle, Loading } from '@supabase/ui'

import { PageContext } from 'pages/project/[ref]/auth/users'
import Table from 'components/to-be-cleaned/Table'
import UserListItem from './UsersListItem'
import UsersPagination from './UsersPagination'
import { checkPermissions } from 'hooks'
import { PermissionAction } from '@supabase/shared-types/out/constants'

const UsersList = ({}) => {
  const PageState: any = useContext(PageContext)
  const canRemoveUser = checkPermissions(PermissionAction.TENANT_SQL_DELETE, 'auth.users')

  return (
    <Loading active={PageState.usersLoading}>
      <Table
        head={
          <>
            <Table.th>Email</Table.th>
            <Table.th>Phone</Table.th>
            <Table.th className="hidden 2xl:table-cell">Provider</Table.th>
            <Table.th className="hidden 2xl:table-cell">Created</Table.th>
            <Table.th className="hidden xl:table-cell">Last Sign In</Table.th>
            <Table.th className="hidden lg:table-cell">User UID</Table.th>
            <Table.th></Table.th>
          </>
        }
        body={
          <>
            {PageState.usersLoading && (
              <Table.tr>
                {/* @ts-ignore */}
                <Table.td
                  colSpan={7}
                  className="h-14 p-4 whitespace-nowrap border-t leading-5 text-gray-300 text-sm"
                >
                  <p className="text-scale-1000">Retrieving users</p>
                </Table.td>
              </Table.tr>
            )}
            {!PageState.usersLoading && PageState.users.length == 0 && (
              <Table.tr>
                {/* @ts-ignore */}
                <Table.td
                  colSpan={7}
                  className="h-14 p-4 whitespace-nowrap border-t leading-5 text-gray-300 text-sm"
                >
                  <div className="flex items-center space-x-3 opacity-75">
                    <IconAlertCircle size={16} strokeWidth={2} />
                    <p className="text-scale-1000">
                      {PageState.filterKeywords
                        ? `No users matched the search query "${PageState.filterKeywords}"`
                        : 'No users in your project yet'}
                    </p>
                  </div>
                </Table.td>
              </Table.tr>
            )}
            {PageState.users.length > 0 &&
              PageState.users.map((x: any) => (
                <UserListItem key={x.id} user={x} canRemoveUser={canRemoveUser} />
              ))}
            <Table.tr>
              <Table.td colSpan={7}>
                <UsersPagination />
              </Table.td>
            </Table.tr>
          </>
        }
      />
    </Loading>
  )
}

export default observer(UsersList)