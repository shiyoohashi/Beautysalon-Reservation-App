import "./main.css";

export const Main: React.FC = () => {
  return (
    <div className="open">
      <div className="intromask">
        <div className="intromask__inner">
          <div className="intromask__logo">
            <img
              className="intromask__logo__img"
              src="./ILOLI HAIR_files/logo.svg"
              width="188"
              height="96"
              alt=""
            />
            <div className="intromask__logo__grad"></div>
          </div>
        </div>
      </div>

      <header className="header">
        <h1 className="header__logo">
          <div className="header__logo__img">ILOLI HAIR</div>
        </h1>
        <div className="header__container" style={{ height: "1037px" }}>
          <span className="header__toggle">
            <span></span>
          </span>
          <div className="header__reserve">
            <a
              href="https://beauty.hotpepper.jp/CSP/bt/reserve/?storeId=H000480990"
              target="_blank"
              className="header__reserve__link"
            >
              <span className="header__reserve__en">Reserve</span>
              <span className="header__reserve__ja">ご予約はこちら</span>
            </a>
          </div>
          <div
            className="header__container__inner"
            style={{ height: "1037px" }}
          >
            <div className="header__sublogo">
              <a
                href="https://iloli-hair.com/#"
                className="header__sublogo__link"
              ></a>
            </div>
            <div className="header__container__main">
              <nav className="header__nav">
                <ul className="header__nav__list">
                  <li className="header__nav__item">
                    <a
                      href="https://iloli-hair.com/#concept"
                      className="header__nav__link"
                    >
                      Concept
                    </a>
                  </li>
                  <li className="header__nav__item">
                    <a
                      href="https://iloli-hair.com/#features"
                      className="header__nav__link"
                    >
                      Features
                    </a>
                  </li>
                  <li className="header__nav__item">
                    <a
                      href="https://iloli-hair.com/#menu"
                      className="header__nav__link"
                    >
                      Menu
                    </a>
                  </li>
                  <li className="header__nav__item">
                    <a
                      href="https://iloli-hair.com/#staff"
                      className="header__nav__link"
                    >
                      Staff
                    </a>
                  </li>
                  <li className="header__nav__item">
                    <a
                      href="https://iloli-hair.com/#access"
                      className="header__nav__link"
                    >
                      Access
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="header__info">
                <dl className="header__info__column">
                  <div className="opentime">
                    <dt>Open:</dt>
                    <dd>
                      <span>9:00 - 19:00</span>
                      最終受付：カット 19:00 / パーマ 18:00
                    </dd>
                  </div>
                  <div className="closetime">
                    <dt>Close:</dt>
                    <dd>月曜 / 第一,第三火曜</dd>
                  </div>
                </dl>
                <dl className="header__info__column">
                  <div className="tel">
                    <dt>Tel:</dt>
                    <dd>058-260-8220</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="firstview" style={{ height: "1037px" }}>
        <div
          className="firstview__main"
          data-images="/images/1.jpg,/images/2.jpg,/images/3.jpg,/images/4.jpg,/images/5.jpg"
          data-width="2880"
          data-height="1920"
          data-interval="8000"
        >
          <div
            className="firstview__viewport"
            style={{ width: "1315.5px", height: "877px" }}
          >
            {/* <!-- <canvas className="firstview__canvas"></canvas> --> */}
            <canvas
              width="2880"
              height="1920"
              style={{ touchAction: "none", cursor: "inherit" }}
            ></canvas>
          </div>
        </div>
      </div>

      <div className="concept scrollFx appear" id="concept">
        <div className="concept__image">
          <div
            className="concept__image__photo"
            data-images="/images/concept_image.jpg"
            data-width="2080"
            data-height="1200"
          >
            <div className="concept__image__gradient">
              <div className="gradientbar vertical" data-grad="0"></div>
            </div>
            <div
              className="concept__image__viewport"
              style={{ width: "719.333px", height: "415px" }}
            >
              <canvas
                width="2080"
                height="1200"
                style={{ touchAction: "none", cursor: "inherit" }}
              ></canvas>
            </div>
          </div>
        </div>
        <div className="concept__body">
          <div className="concept__body__main">
            <h2 className="sectionlabel">
              <span className="sectionlabel__num" data-num="1">
                01
              </span>
              <span className="sectionlabel__title">Concept</span>
            </h2>
            <p>
              私達にできることは、常に美を追求し、
              <br />
              お客様の美しく在りたいという願いを叶えること。
            </p>
            <p>
              お客様の色と私達の色が、このサロンで色とりどり、
              <br />
              美しく輝くように。
            </p>
            <p>
              スタッフ一人一人が真剣に美に向き合い、
              <br />
              最高の技術・知識を提供します。
            </p>
          </div>
        </div>
      </div>

      <div className="features scrollFx appear" id="features">
        <h2 className="sectionlabel">
          <span className="sectionlabel__num" data-num="2">
            02
          </span>
          <span className="sectionlabel__title">Features</span>
        </h2>
        <div className="features__container">
          <div className="features__main">
            <div className="features__section space scrollFx appear">
              <div className="features__section__label">Space</div>
              <div className="features__section__image">
                <div
                  className="features__section__image__img"
                  data-images="/images/feature_space.jpg"
                  data-width="960"
                  data-height="1280"
                >
                  <div
                    className="features__section__image__viewport"
                    style={{ width: "376px", height: "501.333px" }}
                  >
                    <canvas
                      width="960"
                      height="1280"
                      style={{ touchAction: "none", cursor: "inherit" }}
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className="features__section__body">
                <div className="features__section__body__gradient">
                  <div className="gradientbar" data-grad="1"></div>
                </div>
                <h3 className="features__section__body__label">
                  プライベート空間
                </h3>
                <div className="features__section__body__text">
                  <p>
                    席と席の間隔を広くとっていますので、周りを気にせずプライベートな空間でリラックスしていただけます。シャンプースペースも照明を落として、思わず眠ってしまいそうな空間で癒やしのひとときをお過ごしください。
                  </p>
                </div>
              </div>
            </div>
            <div className="features__section treatment scrollFx appear">
              <div className="features__section__label">
                Ordermade Treatment &amp;
                <br />
                Aroma Head Spa
              </div>
              <div className="features__section__image">
                <div
                  className="features__section__image__img"
                  data-images="/images/feature_treatment.jpg"
                  data-width="960"
                  data-height="1280"
                >
                  <div
                    className="features__section__image__viewport"
                    style={{ width: "376px", height: "501.333px" }}
                  >
                    <canvas
                      width="960"
                      height="1280"
                      style={{ touchAction: "none", cursor: "inherit" }}
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className="features__section__body">
                <div className="features__section__body__gradient">
                  <div className="gradientbar" data-grad="2"></div>
                </div>
                <h3 className="features__section__body__label">
                  oggiottoトリートメント
                </h3>
                <div className="features__section__body__text">
                  <p>
                    お客様の髪質に合わせたオーダーメイドトリートメント。髪につける高濃度オーガニック美容液で、重ねれば重ねるほど髪質改善が出来るサプリメントトリートメントです。ヘッドスパでは100%精油のこだわりのエッセンシャルオイルを使用。アロマセラピーも兼ねた高品質なアロマヘッドスパで、日々のストレスや心身のトラブルをほぐす癒やしのひとときを提供いたします。
                  </p>
                </div>
              </div>
            </div>
            <div className="features__section technic scrollFx appear">
              <div className="features__section__label">Technic</div>
              <div className="features__section__image">
                <div
                  className="features__section__image__img"
                  data-images="/images/feature_technic.jpg"
                  data-width="960"
                  data-height="1280"
                >
                  <div
                    className="features__section__image__viewport"
                    style={{ width: "376px", height: "501.333px" }}
                  >
                    <canvas
                      width="960"
                      height="1280"
                      style={{ touchAction: "none", cursor: "inherit" }}
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className="features__section__body">
                <div className="features__section__body__gradient">
                  <div className="gradientbar" data-grad="3"></div>
                </div>
                <h3 className="features__section__body__label">技術</h3>
                <div className="features__section__body__text">
                  <p>
                    伸びてきても気になりづらいグラデーションカラー、骨格に合わせたカット&amp;パーマなど、時間が経ってもきれいに素敵でいられる再現性の高い技術にこだわっています。
                  </p>
                </div>
              </div>
            </div>
            <div className="features__section facility scrollFx appear">
              <div className="features__section__label">Facility</div>
              <div className="features__section__image">
                <div
                  className="features__section__image__img"
                  data-images="/images/feature_facility.jpg"
                  data-width="960"
                  data-height="1280"
                >
                  <div
                    className="features__section__image__viewport"
                    style={{ width: "376px", height: "501.333px" }}
                  >
                    <canvas
                      width="960"
                      height="1280"
                      style={{ touchAction: "none", cursor: "inherit" }}
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className="features__section__body">
                <div className="features__section__body__gradient">
                  <div className="gradientbar" data-grad="4"></div>
                </div>
                <h3 className="features__section__body__label">
                  夢シャンプー台
                </h3>
                <div className="features__section__body__text">
                  <p>
                    フルフラットになるまるでベッドのような寝心地のシャンプー台。専用のヘッドクッションにより、首の負担も全くありません。まさに「夢心地」のお時間を過ごしていただけます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="eyecatch scrollFx appear">
        <div
          className="eyecatch__image"
          data-images="/images/eyecatch.jpg"
          data-width="3680"
          data-height="1280"
        >
          <div
            className="eyecatch__viewport"
            style={{ width: "1193.12px", height: "415px" }}
          >
            <canvas
              width="3680"
              height="1280"
              style={{ touchAction: "none", cursor: "inherit" }}
            ></canvas>
          </div>
        </div>
      </div>

      <div className="menu scrollFx appear" id="menu">
        <h2 className="sectionlabel">
          <span className="sectionlabel__num" data-num="3">
            03
          </span>
          <span className="sectionlabel__title">Menu</span>
        </h2>
        <div className="menu__main">
          <div className="menu__block">
            <div className="menu__section scrollFx appear">
              <h3 className="menu__label">
                <div className="menu__label__gradient">
                  <div className="gradientbar" data-grad="5"></div>
                </div>
                <span className="menu__label__text">Cut Menu</span>
              </h3>
              <dl className="menu__list">
                <dt>カット</dt>
                <dd>¥4,000</dd>
                <dt>フロントカット</dt>
                <dd>¥1,000</dd>
                <dt>カットその他</dt>
                <dd>¥-</dd>
              </dl>
            </div>
          </div>

          <div className="menu__block">
            <div className="menu__section scrollFx appear">
              <h3 className="menu__label">
                <div className="menu__label__gradient">
                  <div className="gradientbar" data-grad="6"></div>
                </div>
                <span className="menu__label__text">Color Menu</span>
              </h3>
              <dl className="menu__list">
                <dt>カラー</dt>
                <dd>¥6,000</dd>
                <dt>イルミナカラー</dt>
                <dd>¥8,000</dd>
                <dt>グロスカラー</dt>
                <dd>¥2,000</dd>
                <dt>シャイニーグロス</dt>
                <dd>¥3,500</dd>
                <dt>リタッチ</dt>
                <dd>¥4,500</dd>
                <dt>ハイライト</dt>
                <dd>¥-</dd>
                <dt>ブリーチ</dt>
                <dd>¥6,000</dd>
                <dt>カラーその他</dt>
                <dd>¥-</dd>
              </dl>
            </div>
          </div>

          <div className="menu__block">
            <div className="menu__section scrollFx appear">
              <h3 className="menu__label">
                <div className="menu__label__gradient">
                  <div className="gradientbar" data-grad="7"></div>
                </div>
                <span className="menu__label__text">Other Menu</span>
              </h3>
              <dl className="menu__list">
                <dt>シャンプー・ブロー</dt>
                <dd>¥2,000</dd>
                <dt>アイブロー</dt>
                <dd>¥1,500</dd>
                <dt>セット</dt>
                <dd>¥5,000</dd>
                <dt>メイク</dt>
                <dd>¥-</dd>
                <dt>着付け</dt>
                <dd>¥-</dd>
                <dt>その他</dt>
                <dd>¥-</dd>
              </dl>
            </div>
          </div>

          <div className="menu__block">
            <div className="menu__section scrollFx appear">
              <h3 className="menu__label">
                <div className="menu__label__gradient">
                  <div className="gradientbar" data-grad="8"></div>
                </div>
                <span className="menu__label__text">Treatment Menu</span>
              </h3>
              <dl className="menu__list">
                <dt>オッジオット（クイック）</dt>
                <dd>¥3,500</dd>
                <dt>オッジオット（ベーシック）</dt>
                <dd>¥4,500</dd>
                <dt>オッジオット（アドバンス）</dt>
                <dd>¥6,000</dd>
                <dt>オッジオット（プレミアム）</dt>
                <dd>¥8,000</dd>
                <dt>トリートメントその他</dt>
                <dd>¥-</dd>
              </dl>
            </div>
          </div>

          <div className="menu__block">
            <div className="menu__section scrollFx appear">
              <h3 className="menu__label">
                <div className="menu__label__gradient">
                  <div className="gradientbar" data-grad="9"></div>
                </div>
                <span className="menu__label__text">Parm Menu</span>
              </h3>
              <dl className="menu__list">
                <dt>パーマ</dt>
                <dd>¥6,000</dd>
                <dt>クリープパーマ</dt>
                <dd>¥8,000</dd>
                <dt>特殊パーマ</dt>
                <dd>¥-</dd>
                <dt>縮毛　S</dt>
                <dd>¥20,000</dd>
                <dt>縮毛　M</dt>
                <dd>¥25,000</dd>
                <dt>縮毛　L</dt>
                <dd>¥30,000</dd>
                <dt>部分縮毛</dt>
                <dd>¥-</dd>
                <dt>ストレートパーマ</dt>
                <dd>¥12,000</dd>
                <dt>デジタルパーマ</dt>
                <dd>¥14,000</dd>
                <dt>パーマその他</dt>
                <dd>¥-</dd>
              </dl>
            </div>
          </div>

          <div className="menu__block">
            <div className="menu__section scrollFx appear">
              <h3 className="menu__label">
                <div className="menu__label__gradient">
                  <div className="gradientbar" data-grad="10"></div>
                </div>
                <span className="menu__label__text">Spa Menu</span>
              </h3>
              <dl className="menu__list">
                <dt>アロマスパ</dt>
                <dd>¥3,500</dd>
                <dt>エイジングアロマスパ</dt>
                <dd>¥6,000</dd>
              </dl>
            </div>
            <div className="menu__section scrollFx appear">
              <h3 className="menu__label">
                <div className="menu__label__gradient">
                  <div className="gradientbar" data-grad="11"></div>
                </div>
                <span className="menu__label__text">Esthe Menu</span>
              </h3>
              <dl className="menu__list">
                <dt>エステ</dt>
                <dd>¥-</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="staff scrollFx appear" id="staff">
        <h2 className="sectionlabel">
          <span className="sectionlabel__num" data-num="4">
            04
          </span>
          <span className="sectionlabel__title">Staff</span>
        </h2>
        <div className="staff__container">
          <div className="staff__main">
            <div className="staff__block takagi scrollFx appear">
              <div className="staff__image">
                <div
                  className="staff__image__img"
                  data-images="/images/staff_takagi.jpg"
                  data-width="640"
                  data-height="854"
                >
                  <div
                    className="staff__image__viewport"
                    style={{ width: "376px", height: "501.725px" }}
                  >
                    <canvas
                      width="640"
                      height="854"
                      style={{ touchAction: "none", cursor: "inherit" }}
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className="staff__body">
                <div className="staff__gradient">
                  <div className="gradientbar" data-grad="12"></div>
                </div>
                <h3 className="staff__name">
                  <span className="staff__name__ja">高木 将偉</span>
                  <span className="staff__name__en">Shoui Takagi</span>
                </h3>
                <div className="staff__text">
                  <p>
                    変化を楽しみたい方、一緒に楽しくスタイルを決めていきましょう。一人一人にあった形でご提案させていただきます。お客様の人生に、少しでも関わることができたら幸いです。
                  </p>
                </div>
              </div>
            </div>
            <div className="staff__block makino scrollFx appear">
              <div className="staff__image">
                <div
                  className="staff__image__img"
                  data-images="/images/staff_makino.jpg"
                  data-width="640"
                  data-height="854"
                >
                  <div
                    className="staff__image__viewport"
                    style={{ width: "376px", height: "501.725px" }}
                  >
                    <canvas
                      width="640"
                      height="854"
                      style={{ touchAction: "none", cursor: "inherit" }}
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className="staff__body">
                <div className="staff__gradient">
                  <div className="gradientbar" data-grad="13"></div>
                </div>
                <h3 className="staff__name">
                  <span className="staff__name__ja">牧野 友洋</span>
                  <span className="staff__name__en">Tomohiro Makino</span>
                </h3>
                <div className="staff__text">
                  <p>
                    コンプレックスも捉え方を変えればチャームポイントに。もっと自分を好きになってもらえる技術・提案を心がけています。ヘアスタイルを通して、日常をより楽しくしていきましょう。
                  </p>
                </div>
              </div>
            </div>
            <div className="staff__block sato scrollFx appear">
              <div className="staff__image">
                <div
                  className="staff__image__img"
                  data-images="/images/staff_sato.jpg"
                  data-width="640"
                  data-height="854"
                >
                  <div
                    className="staff__image__viewport"
                    style={{ width: "376px", height: "501.725px" }}
                  >
                    <canvas
                      width="640"
                      height="854"
                      style={{ touchAction: "none", cursor: "inherit" }}
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className="staff__body">
                <div className="staff__gradient">
                  <div className="gradientbar" data-grad="14"></div>
                </div>
                <h3 className="staff__name">
                  <span className="staff__name__ja">佐藤 樹里</span>
                  <span className="staff__name__en">Juri Sato</span>
                </h3>
                <div className="staff__text">
                  <p>
                    お客様のライフスタイルや理想のイメージを一緒に考えながら、最大限に素敵なスタイルをご提案させていただきます。また、ヘアアレンジやメイク、エステや着付けなどの資格も修得しておりますので、お気軽にご相談ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="access scrollFx appear" id="access">
        <div className="access__main">
          <h2 className="sectionlabel">
            <span className="sectionlabel__num" data-num="5">
              05
            </span>
            <span className="sectionlabel__title">Access</span>
          </h2>
          <p className="access__main__address">
            〒501-6104
            <br />
            岐阜市柳津町本郷 3-187-1
          </p>
          <dl className="access__main__info">
            <dt>Open:</dt>
            <dd>
              9:00 - 19:00
              <br />
              <span>最終受付：カット 19:00 / パーマ 18:00</span>
            </dd>
            <dt>Close:</dt>
            <dd>
              <span>月曜 / 第一、第三火曜</span>
            </dd>
          </dl>
          <dl className="access__main__info">
            <dt>Tel:</dt>
            <dd>058-260-8220</dd>
          </dl>
        </div>
        <div className="access__map">
          <div className="access__map__embed">
            {/* <iframe
              src={"./embed.html"}
              width={"1120"}
              height="560"
              frameBorder="0"
              style={{ border: "0" }}
              allow="fullscreen"
              aria-hidden="false"
              tabIndex={0}
            ></iframe> */}
          </div>
          <div className="access__map__link">
            <a
              href="https://goo.gl/maps/3tVaYJDV2Q4htBRY8"
              target="_blank"
              className="access__map__link__button"
            >
              <span className="access__map__link__label">
                View on Google Map
              </span>
              <div className="access__map__link__gradient">
                <div className="gradientbar" data-grad="5"></div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <aside className="asides">
        <div className="asides__block blog">
          <a
            href="https://beauty.hotpepper.jp/slnH000480990/blog/"
            target="_blank"
            className="asides__link"
          >
            <div className="aside__grad"></div>
            <div className="asides__label">Blog</div>
            <div className="asides__text">
              おすすめのメニューやスタイルをご紹介
            </div>
            <div className="asides__domain">beauty.hotpepper.jp</div>
          </a>
        </div>
        <div className="asides__block styling">
          <a
            href="https://beauty.hotpepper.jp/slnH000480990/style/"
            target="_blank"
            className="asides__link"
          >
            <div className="aside__grad"></div>
            <div className="asides__label">Styling</div>
            <div className="asides__text">
              ILOLIでのスタイリング作例をご紹介
            </div>
            <div className="asides__domain">beauty.hotpepper.jp</div>
          </a>
        </div>
        <div className="asides__block instagram">
          <a
            href="https://www.instagram.com/__iloli.hair__/"
            target="_blank"
            className="asides__link"
          >
            <div className="aside__grad"></div>
            <div className="asides__label">Instagram</div>
            <div className="asides__text">日常のスナップ写真を掲載</div>
            <div className="asides__domain">beauty.hotpepper.jp</div>
          </a>
        </div>
      </aside>

      <footer className="footer">
        <div className="footer__logo">ILOLI HAIR</div>
        <div className="footer__main">
          <dl className="footer__main__column">
            <dt>Open:</dt>
            <dd>
              9:00 - 19:00
              <br />
              最終受付：カット 19:00 / パーマ 18:00
            </dd>
            <dt>Close:</dt>
            <dd>月曜 / 第一,第三火曜</dd>
          </dl>
          <dl className="footer__main__column">
            <dt>Access:</dt>
            <dd>
              〒501-6104
              <br />
              岐阜市柳津町本郷 3-187-1
            </dd>
            <dd>
              <a href="https://goo.gl/maps/3tVaYJDV2Q4htBRY8" target="_blank">
                View on Google Map
              </a>
            </dd>
          </dl>
          <dl className="footer__main__column">
            <dt>Tel:</dt>
            <dd>058-260-8220</dd>
          </dl>
        </div>
        <small className="footer__small">© ILOLI HAIR</small>
      </footer>
    </div>
  );
};
