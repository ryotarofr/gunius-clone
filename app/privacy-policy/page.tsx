import { LandingNavbar } from "@/components/landing-navbar";
import { Button } from "@/components/ui/button";


const Privacy = () => {
  return (
    <div className="bg-slate-700 min-h-scree pb-20">
      <LandingNavbar />
      <div className="flex justify-center mx-3">
        <div>
          <h1 className="text-2xl text-gray-100 text-center">プライバシーポリシー
          </h1>
          <hr className="my-3" />
          <div className="max-w-4xl">
            <h3 className="text-xl text-gray-300">お客様から取得する情報</h3>
            <p className="my-2 text-gray-50">当社は、お客様から以下の情報を取得します。</p>

            <li className="text-gray-200">Cookie(クッキー)を用いて生成された識別情報</li>
            <li className="text-gray-200">OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報</li>

            <h3 className="text-xl text-gray-300">お客様の情報を利用する目的</h3>
            <p className="my-2 text-gray-50">当社は、お客様から取得した情報を、以下の目的のために利用します。</p>

            <li className="text-gray-200">当社サービスに関する登録の受付、お客様の本人確認、認証のため</li>
            <li className="text-gray-200">お客様の当社サービスの利用履歴を管理するため</li>
            <li className="text-gray-200">当社のサービスに関するご案内をするため</li>
            <li className="text-gray-200">お客様からのお問い合わせに対応するため</li>
            <li className="text-gray-200">当社の規約や法令に違反する行為に対応するため</li>
            <li className="text-gray-200">当社サービスの変更、提供中止、終了、契約解除をご連絡するため</li>
            <li className="text-gray-200">当社規約の変更等を通知するため</li>
            <li className="text-gray-200">以上の他、当社サービスの提供、維持、保護及び改善のため</li>

            <h3 className="text-xl text-gray-300">安全管理のために講じた措置</h3>
            <p className="my-2 text-gray-50">当社が、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。</p>
            <h3 className="text-xl text-gray-300">第三者提供</h3>
            <p className="my-2 text-gray-50">当社は、お客様から取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。但し、次の場合は除きます。</p>

            <li className="text-gray-200">個人データの取扱いを外部に委託する場合
            </li>
            <li className="text-gray-200">当社や当社サービスが買収された場合</li>
            <li className="text-gray-200">当社のサービスに関するご案内をするため</li>
            <li className="text-gray-200">事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）</li>
            <li className="text-gray-200">その他、法律によって合法的に第三者提供が許されている場合</li>


            <h3 className="text-xl text-gray-300">アクセス解析ツール</h3>
            <p className="my-2 text-gray-50">当社は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。「Googleアナリティクス」は、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくはこちらからご確認ください。

            </p>
            <h3 className="text-xl text-gray-300">プライバシーポリシーの変更</h3>
            <p className="my-2 text-gray-50">当社は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。</p>
            <h3 className="text-xl text-gray-300">お問い合わせ</h3>
            <p className="my-2 text-gray-50">お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のメールアドレスにご連絡ください。
              instagramアカウント@fr__1030(*ハイフン2つです。)
              この場合、必ず、運転免許証のご提示等当社が指定する方法により、ご本人からのご請求であることの確認をさせていただきます。なお、情報の開示請求については、開示の有無に関わらず、ご申請時に一件あたり1,000円の事務手数料を申し受けます。</p>
            <h3 className="text-xl text-gray-300">事業者の氏名</h3>
            <p className="my-2 text-gray-50">FR</p>


            <p className="my-2 text-gray-50">2023年09月01日 制定
            </p>
            <Button >
              お問い合わせ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
