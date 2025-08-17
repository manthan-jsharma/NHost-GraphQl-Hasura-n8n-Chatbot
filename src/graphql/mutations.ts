import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
  mutation CreateChat($title: String!, $user_id: uuid!) {
    insert_chats_one(object: { title: $title, user_id: $user_id }) {
      id
      title
      user_id
      created_at
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $chatId: uuid!
    $content: String!
    $role: String!
    $user_id: uuid!
  ) {
    insert_messages_one(
      object: {
        chat_id: $chatId
        content: $content
        role: $role
        user_id: $user_id
      }
    ) {
      id
      content
      role
      user_id
      created_at
    }
  }
`;

export const SEND_MESSAGE_ACTION = gql`
  mutation SendMessageAction($chatId: uuid!, $message: String!) {
    sendMessage(chatId: $chatId, message: $message) {
      success
      message
    }
  }
`;

export const DELETE_CHAT = gql`
  mutation DeleteChat($id: uuid!) {
    delete_chats_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_CHAT_TITLE = gql`
  mutation UpdateChatTitle($id: uuid!, $title: String!) {
    update_chats_by_pk(pk_columns: { id: $id }, _set: { title: $title }) {
      id
      title
    }
  }
`;
export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($id: uuid!, $content: String!) {
    update_messages_by_pk(
      pk_columns: { id: $id }
      _set: { content: $content }
    ) {
      id
      content
    }
  }
`;
