#!/usr/bin/env node

import "dotenv/config";
import prompts from "prompts";

async function generateReplyFromUrlSelection() {
  const answers = await prompts([
    {
      type: "text",
      name: "companyName",
      message: "会社名を入力してください（例: 株式会社あ）",
    },
    {
      type: "text",
      name: "recipientName",
      message:
        "担当者名を入力してください（空欄の場合は「採用担当者」になります）",
    },
    {
      // TODO: ここ楽にしたい
      type: "text",
      name: "dateTime",
      message: "日時を入力してください（例: 1月15日 (水) 14:00 - 15:00）",
    },
  ]);

  const recipient = answers.recipientName || "採用担当者";
  const message = `
${answers.companyName}
${recipient}様

お世話になっております、${process.env.LAST_NAME}と申します。
カジュアル面談の機会をいただきありがとうございます！

いただいたURLより、以下日程を選択いたしました。こちらでご調整いただけますでしょうか。
※以下以外でも可能です。
・${answers.dateTime}

お忙しいところ恐れ入りますが、ご確認のほどよろしくお願いいたします。`;

  console.log("\n--- 生成されたメッセージ ---\n");
  console.log(message);
}

async function generateThanksReply() {
  const answers = await prompts([
    {
      type: "text",
      name: "companyName",
      message: "会社名を入力してください（例: 株式会社あ）",
    },
    {
      type: "text",
      name: "recipientName",
      message:
        "担当者名を入力してください（空欄の場合は「採用担当者」になります）",
    },
  ]);

  const recipient = answers.recipientName || "採用担当者";

  const message = `
${answers.companyName}
${recipient}様

お世話になっております、${process.env.LAST_NAME}と申します。
お忙しい所面談の調整をいただきありがとうございました。

当日はよろしくお願いいたします。 `;

  console.log("\n--- 生成されたメッセージ ---\n");
  console.log(message);
}

async function main() {
  const { action } = await prompts({
    type: "select",
    name: "action",
    message: "やりたいことを選択してください",
    choices: [
      { title: "返信文章生成（URLから選択したパターン）", value: "reply" },
      { title: "調整のお礼", value: "thanks" },
    ],
  });

  switch (action) {
    case "reply":
      await generateReplyFromUrlSelection();
      break;
    case "thanks":
      await generateThanksReply();
      break;
    default:
      console.log("キャンセルされました");
  }
}

main();
