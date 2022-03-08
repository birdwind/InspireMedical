// auth模組
import { HistoryMessage } from "@/base/data/historyMessage";
import { LocalesEnums } from "@/enums/LocalesEnums";

export type UpdateLang = (localesEnums: LocalesEnums) => void;
export type LoginServer = (data: { account: string; password: string }) => Promise<void>;
export type UpdateAuthorization = (data: any) => Promise<void>;

// ui模組
export type ShowLoading = (isShow: boolean) => void;
export type Reload = (isReload: boolean) => Promise<void>;
export type AddHistoryMessage = (message: HistoryMessage) => Promise<void>;
