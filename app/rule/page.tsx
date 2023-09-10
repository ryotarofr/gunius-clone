import { LandingNavbar } from "@/components/landing-navbar";
import { Button } from "@/components/ui/button";


const Rule = () => {
  return (
    <div className="bg-slate-700 min-h-scree pb-20">
      {/* <Header /> */}
      <LandingNavbar />
      <div className="flex justify-center mx-3">
        <div>
          <h1 className="text-2xl text-gray-100 text-center">特定商取引法に基づく表示</h1>
          <hr className="my-3" />
          <div className="">
            <h3 className="text-xl text-gray-300">＜事業者の名称（個人名）＞</h3>
            <p className="my-2 text-gray-50">藤井 亮太朗</p>
            <h3 className="text-xl text-gray-300">＜事業者の所在地＞</h3>
            <p className="my-2 text-gray-50">〒795-0204 日本山口県宇部市大字妻崎開作2020-4</p>
            <h3 className="text-xl text-gray-300">＜事業者の連絡先＞</h3>
            <p className="my-2 text-gray-50">電話番号:080-2925-7601</p>
            <h3 className="text-xl text-gray-300">＜メールアドレス＞</h3>
            <p className="my-2 text-gray-50">ryoryo.fr0608@icloud.com</p>
            <h3 className="text-xl text-gray-300">＜運営統括責任者＞</h3>
            <p className="my-2 text-gray-50">藤井 亮太朗</p>
            <h3 className="text-xl text-gray-300">＜商品代金以外の必要料金＞</h3>
            <p className="my-2 text-gray-50">-</p>
            <h3 className="text-xl text-gray-300">＜返品・交換の方法＞</h3>
            <p className="my-2 text-gray-50">不可</p>

            {/* <p>
            サービスについてのお問い合わせは、電話では受け付けておりません。お手数ですが、ご連絡は
            <a>サポートフォーム</a>
            をご利用ください。サービスについてのご質問、ご不明な点、ご意見等をお聞かせください。
          </p> */}
            <h3 className="text-xl text-gray-300">＜価格＞</h3>
            <p className="my-2 text-gray-50">$4.99</p>
            <h3 className="text-xl text-gray-300">＜支払い方法＞</h3>
            <p className="my-2 text-gray-50">Stripe Checkout</p>
            <h3 className="text-xl text-gray-300">＜提供期間＞</h3>
            <p className="my-2 text-gray-50">お支払い完了後から1ヶ月間（1ヶ月ごとに定期購読を自動更新）</p>
            <Button >
              お問い合わせ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rule;
