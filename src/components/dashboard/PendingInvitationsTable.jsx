import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PENDING_INVITATIONS } from '../../graphql/queries/invitations';
import { RESEND_INVITATION, CANCEL_INVITATION } from '../../graphql/mutations/invitations';
import { formatDate } from '../../utils/helpers';

const roleBadge = {
  super_admin: 'bg-red-100 text-red-700',
  admin: 'bg-purple-100 text-purple-700',
  instructor: 'bg-orange-100 text-orange-700',
  editor: 'bg-blue-100 text-blue-700',
  learner: 'bg-gray-100 text-gray-600',
};

const PendingInvitationsTable = () => {
  const { data, loading, refetch } = useQuery(GET_PENDING_INVITATIONS);
  const [resendInvitation, { loading: resending }] = useMutation(RESEND_INVITATION);
  const [cancelInvitation, { loading: cancelling }] = useMutation(CANCEL_INVITATION);
  const [actionId, setActionId] = useState(null);

  const invitations = data?.pendingInvitations || [];

  const handleResend = async (id) => {
    setActionId(id);
    try {
      const { data } = await resendInvitation({ variables: { invitationId: id } });
      if (data.resendInvitation.success) {
        refetch();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionId(null);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this invitation?')) return;

    setActionId(id);
    try {
      const { data } = await cancelInvitation({ variables: { invitationId: id } });
      if (data.cancelInvitation.success) {
        refetch();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionId(null);
    }
  };

  if (invitations.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">
          Pending Invitations ({invitations.length})
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage user invitations waiting to be accepted
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-[3px] border-gray-200 border-t-primary-600" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">User</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Role</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Invited By</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Sent</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Expires</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invitations.map((invitation) => {
                const isExpired = invitation.isExpired;
                const daysUntilExpiry = Math.ceil(
                  (new Date(invitation.expiresAt) - new Date()) / (1000 * 60 * 60 * 24)
                );

                return (
                  <tr key={invitation.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{invitation.fullName}</p>
                        <p className="text-xs text-gray-400">{invitation.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          roleBadge[invitation.role] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {invitation.roleDisplay}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {invitation.invitedBy?.fullName || 'Unknown'}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(invitation.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      {isExpired ? (
                        <span className="text-xs font-semibold text-red-600">Expired</span>
                      ) : (
                        <span
                          className={`text-xs font-semibold ${
                            daysUntilExpiry <= 2 ? 'text-orange-600' : 'text-gray-500'
                          }`}
                        >
                          {daysUntilExpiry} day{daysUntilExpiry !== 1 ? 's' : ''}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleResend(invitation.id)}
                          disabled={resending && actionId === invitation.id}
                          className="text-xs text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50"
                        >
                          {resending && actionId === invitation.id ? 'Sending...' : 'Resend'}
                        </button>
                        <button
                          onClick={() => handleCancel(invitation.id)}
                          disabled={cancelling && actionId === invitation.id}
                          className="text-xs text-red-500 hover:text-red-600 font-medium disabled:opacity-50"
                        >
                          {cancelling && actionId === invitation.id ? 'Cancelling...' : 'Cancel'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingInvitationsTable;
