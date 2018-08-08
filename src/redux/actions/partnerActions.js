export const PARTNER_ACTIONS = {
    FETCH_PARTNERS: 'FETCH_PARTNERS',
    SET_PARTNERS: 'SET_PARTNERS',
    ADD_PARTNER: 'ADD_PARTNER',
    EDIT_PARTNER: 'EDIT_PARTNER',
    HIDE_PARTNER: 'HIDE_PARTNER',
    DELETE_PARTNER: 'DELETE_PARTNER',
    EDIT_PROFILE_IMAGE: 'EDIT_PROFILE_IMAGE',
  };

  export const triggerProfileImageUpload = (imageData, partner_id) => ({
    type: PARTNER_ACTIONS.EDIT_PROFILE_IMAGE,
    payload: {
      imageData,
      partner_id,
    },
  });