import { gql } from "@apollo/client";

export const GET_CHATS = gql`
  query GetChats {
    chats(order_by: { updated_at: desc }) {
      id
      title
      user_id
      created_at
      updated_at
      messages(limit: 1, order_by: { created_at: desc }) {
        content
        role
      }
    }
  }
`;

export const GET_CHAT_MESSAGES = gql`
  query GetChatMessages($chatId: uuid!) {
    messages(
      where: { chat_id: { _eq: $chatId } }
      order_by: { created_at: asc }
    ) {
      id
      content
      role
      user_id
      created_at
    }
  }
`;

export const SUBSCRIBE_TO_MESSAGES = gql`
  subscription SubscribeToMessages($chatId: uuid!) {
    messages(
      where: { chat_id: { _eq: $chatId } }
      order_by: { created_at: asc }
    ) {
      id
      content
      role
      user_id
      created_at
    }
  }
`;
