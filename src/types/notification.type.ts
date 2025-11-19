export interface Notification {
  notificationId: number;
  type: "reply" | "reaction" | "system";
  message: string;
  data?: any;
  isRead: boolean;
  replier?: {
    userId: number;
    fullName: string;
    email?: string;
  };
  result?: any;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationResponse {
  EC: number;
  EM: string;
  data: Notification[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UnreadCountResponse {
  EC: number;
  EM: string;
  count: number;
}
