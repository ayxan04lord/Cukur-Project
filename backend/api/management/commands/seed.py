"""
python manage.py seed          — DB-ni doldur
python manage.py seed --clear  — əvvəlcə təmizlə, sonra doldur
"""
from django.core.management.base import BaseCommand
from api.models import Season, SliderSlide, Person


SEASONS_DATA = [
    {
        "num": 1,
        "year": "2017 – 2018",
        "episodes": 35,
        "image": "/img/Cukur_SEZON1.jpg",
        "link": "https://youtube.com/playlist?list=PLAKgawc7H3oYIRuQcxomjlUOPCvZjg7YI",
        "desc": "Yamaç Koçovalı sevgilisi Sena ilə tanışdıqdan sonra Çukur'a qayıdır. Lakin məhəllənin yeni sahibi olmaq istəyən Azer Kurtuluş ailənin düşməninə çevrilir.",
    },
    {
        "num": 2,
        "year": "2018 – 2019",
        "episodes": 34,
        "image": "/img/Çukur_2._sezon.jpg",
        "link": "https://youtube.com/playlist?list=PL7h02KuJlP_H4M2cekyoJANr5mMqlCN3T",
        "desc": "Koçovalı ailəsi Çukur'u qorumağa davam edir. Selim Koçovalının qayıdışı və yeni güc mübarizələri bu mövsümün əsas xəttini təşkil edir.",
    },
    {
        "num": 3,
        "year": "2019 – 2020",
        "episodes": 32,
        "image": "/img/sezon_3.jpg",
        "link": "https://youtube.com/playlist?list=PLN7aJACZDHx47GizuD1dZmG0_XJpktEic",
        "desc": "Yamaç Koçovalı Çukuru bütün düşmənlərindən qorumaq üçün böyük qurbanlar verir. Ailənin birliyinin sınandığı ən dramatik mövsüm.",
    },
    {
        "num": 4,
        "year": "2020 – 2021",
        "episodes": 30,
        "image": "/img/sezon4.webp",
        "link": "https://youtube.com/playlist?list=PLN7aJACZDHx7O-3c2g1YQn1YTJfQrbKNI",
        "desc": "Serialın son mövsümü. Koçovalı ailəsi Çukurun nəzarətini tamamilə ələ keçirmək üçün son döyüşə çıxır.",
    },
]

SLIDES_DATA = [
    {"label": "SEZON 1", "year": "2017", "image": "/img/Cukur_SEZON1.jpg",
     "link": "https://youtube.com/playlist?list=PLAKgawc7H3oYIRuQcxomjlUOPCvZjg7YI&si=zhgxyCk5Zwo7M1CM", "order": 1},
    {"label": "SEZON 2", "year": "2018", "image": "/img/Çukur_2._sezon.jpg",
     "link": "https://youtube.com/playlist?list=PL7h02KuJlP_H4M2cekyoJANr5mMqlCN3T&si=7QVuw74Oa05P7iTT", "order": 2},
    {"label": "SEZON 3", "year": "2019", "image": "/img/sezon_3.jpg",
     "link": "https://youtube.com/playlist?list=PLN7aJACZDHx47GizuD1dZmG0_XJpktEic&si=wgJGWzQ8dcADB3GV", "order": 3},
    {"label": "SEZON 4", "year": "2020", "image": "/img/sezon4.webp",
     "link": "https://youtube.com/playlist?list=PLN7aJACZDHx7O-3c2g1YQn1YTJfQrbKNI&si=gJ56MBL2e9a7fR8T", "order": 4},
]

PERSONS_DATA = [
    {"id": 1,  "actor": "Aras Bulut İynemli",    "role": "Yamaç Koçovalı",        "image": "/img/yamac.png",
     "wiki": "https://tr.wikipedia.org/wiki/Aras_Bulut_%C4%B0ynemli",
     "info": "Koçovalı ailəsinin ən kiçik oğlu. Şəhəri tərk edib başqa həyat qurmağa çalışsa da qardaşı Selim onu yenidən Çukura çəkir. Sena ilə sevgisi serialın əsas xəttini təşkil edir.",
     "type": "protagonist", "seasons": [1, 2, 3, 4]},
    {"id": 2,  "actor": "Dilan Çiçek Deniz",      "role": "Sena Koçovalı",          "image": "/img/sena.jpg",
     "wiki": "https://tr.wikipedia.org/wiki/Dilan_%C3%87i%C3%A7ek_Deniz",
     "info": "Varlı bir ailənin qızı olan Sena, Yamaç ilə tanışdıqdan sonra həyatı tamamilə dəyişir. Çukurun qaranlıq dünyasına adım atsada sevgisindən heç vaxt vazgeçmir.",
     "type": "protagonist", "seasons": [1, 2, 3]},
    {"id": 3,  "actor": "Ercan Kesal",             "role": "İdris Koçovalı",         "image": "/img/idris.png",
     "wiki": "https://tr.wikipedia.org/wiki/Ercan_Kesal",
     "info": "Koçovalı ailəsinin patriarxı. Çukur məhəlləsinin idarəçisi olan İdris, ailəsini hər şeyin üstündə tutur. Ədaləti, güclü şəxsiyyəti və hikmətli sözləri ilə hamıya hörmət etdirir.",
     "type": "protagonist", "seasons": [1, 2, 3, 4]},
    {"id": 4,  "actor": "Perihan Savaş",           "role": "Sultan Koçovalı",        "image": "/img/sultan.png",
     "wiki": "https://tr.wikipedia.org/wiki/Perihan_Sava%C5%9F",
     "info": "İdrisin həyat yoldaşı, Koçovalı ailəsinin anası. Görünüşcə sakit, lakin iradəsi dəmir kimi möhkəm olan Sultan, ailəsini qorumaq üçün hər şeyə hazırdır.",
     "type": "protagonist", "seasons": [1, 2, 3, 4]},
    {"id": 5,  "actor": "Mustafa Üstündağ",        "role": "Kahraman Koçovalı",      "image": "/img/kahraman.jpg",
     "wiki": "https://tr.wikipedia.org/wiki/Mustafa_%C3%9Cst%C3%BCnda%C4%9F_(oyuncu)",
     "info": "İdrisin böyük oğlu. Uzun müddət ailədən uzaq qalan Kahraman, Çukura qayıtdıqda ciddi gərginliklər yaranır. Ağır keçmişi olan bu xarakter mürəkkəb bir psixologiyaya malikdir.",
     "type": "protagonist", "seasons": [2, 3]},
    {"id": 6,  "actor": "Öner Erkan",              "role": "Selim Koçovalı",         "image": "/img/selim.png",
     "wiki": "https://tr.wikipedia.org/wiki/%C3%96ner_Erkan",
     "info": "İdrisin oğlu, Yamacın qardaşı. Sərxoş həyat tərzi sürən Selim, Yamacı yenidən Çukura çəkib gətirir. Zamanla özünü taparaq ailə üçün mühüm bir dayağa çevrilir.",
     "type": "protagonist", "seasons": [1, 2]},
    {"id": 7,  "actor": "Erkan Kolçak Köstendil",  "role": "Vartolu Saadettin",      "image": "/img/vartolu.jpg",
     "wiki": "https://en.wikipedia.org/wiki/Erkan_Kol%C3%A7ak_K%C3%B6stendil",
     "info": "Çukurun ən rəngarəng personajlarından biri. Əvvəlcə rəqib, sonra Koçovalıların ən etibarlı müttəfiqlərindən birinə çevrilir.",
     "type": "protagonist", "seasons": [1, 2, 3, 4]},
    {"id": 8,  "actor": "Rıza Kocaoğlu",           "role": "Aliço",                  "image": "/img/aliço.jpeg",
     "wiki": "https://en.wikipedia.org/wiki/R%C4%B1za_Kocao%C4%9Flu",
     "info": "Çukurun sadiq sakinlərindən biri. Koçovalı ailəsinə bağlı olan Aliço, sadəliyi və dürüstlüyü ilə seçilir.",
     "type": "protagonist", "seasons": [1, 2, 3, 4]},
    {"id": 9,  "actor": "Burak Sergen",             "role": "Baykal Kent",            "image": "/img/baykal.jpg",
     "wiki": "https://en.wikipedia.org/wiki/Burak_Sergen",
     "info": "Kent ailəsinin başçısı. Çukur üzərindəki nüfuzu ələ keçirmək istəyən Baykal, Koçovalıların əsas rəqiblərindən biridir.",
     "type": "antagonist", "seasons": [1, 2]},
    {"id": 10, "actor": "Nebil Sayın",              "role": "Muhittin Derbent",       "image": "/img/muhittin.jpg",
     "wiki": "https://tr.wikipedia.org/wiki/Nebil_Say%C4%B1n",
     "info": "Derbent ailəsinin ağsaqqalı. Çukurda uzun müddətdir güc sahibi olan Muhittin, həm düşmən həm də müttəfiq ola bilən çoxşaxəli bir personajdır.",
     "type": "antagonist", "seasons": [1, 2, 3]},
    {"id": 11, "actor": "Kubilay Aka",              "role": "Celasun Gümüş",         "image": "/img/celasun.jpg",
     "wiki": "https://en.wikipedia.org/wiki/Kubilay_Aka",
     "info": "Gümüş ailəsindən olan Celasun, Çukurda mühüm rol oynayır. Zamanla Koçovalılarla yaxınlaşır. Dinamik xarakteri ilə seriala rəngarənglik qatır.",
     "type": "protagonist", "seasons": [2, 3]},
    {"id": 12, "actor": "Ahmet Tansu Taşanlar",     "role": "Nazım Kent",             "image": "/img/nazım.jpg",
     "wiki": "https://en.wikipedia.org/wiki/Ahmet_Tansu_Ta%C5%9Fanlar",
     "info": "Kent ailəsindən olan Nazım, atasının izini gedərək Çukur üzərindəki hakimiyyəti ələ keçirməyə çalışır.",
     "type": "antagonist", "seasons": [2, 3]},
    {"id": 13, "actor": "Çetin Sarıkartal",         "role": "Cihangir (Paşa)",        "image": "/img/paşa.jpg",
     "wiki": "https://tr.wikipedia.org/wiki/%C3%87etin_Sar%C4%B1kartal",
     "info": "Çukurun köhnə sakinlərindən olan Paşa, güc mübarizəsinin ortasında özünə yer tapmağa çalışır. Təcrübəli, ağıllı və ehtiyatlı bir xarakter.",
     "type": "protagonist", "seasons": [1, 2, 3]},
    {"id": 14, "actor": "Kadir Çermik",             "role": "Mücahit (Emmi)",         "image": "/img/emmi.jpg",
     "wiki": "https://tr.wikipedia.org/wiki/Kadir_%C3%87ermik",
     "info": "Çukur sakinlərinin ağsaqqalı. Emmi ləqəbi ilə tanınan bu xarakter, hər kəsin problemini dinləyib məsləhət verən bir akil kişidir.",
     "type": "protagonist", "seasons": [1, 2, 3, 4]},
    {"id": 15, "actor": "İrem Altuğ",               "role": "Ayşe Koçovalı",          "image": "/img/ayse.png",
     "wiki": "https://en.wikipedia.org/wiki/%C4%B0rem_Altu%C4%9F",
     "info": "Koçovalı ailəsinin gəlini. Ailəyə qatılmasıyla Çukurun daxili dinamikası dəyişir. Güclü iradəsi ilə ağır şərtlərə uyum sağlayan bir qadındır.",
     "type": "protagonist", "seasons": [1, 2, 3]},
    {"id": 16, "actor": "Zeynep Kumral",            "role": "Nedret Koçovalı",        "image": "/img/nedret.webp",
     "wiki": "https://tr.wikipedia.org/wiki/Zeynep_Kumral",
     "info": "Koçovalı ailəsinin bir üzvü. Ailəyə bağlılığı və sadəliyi ilə seçilən Nedret, çətin anlarda özünü itirmir.",
     "type": "protagonist", "seasons": [1, 2]},
    {"id": 17, "actor": "Boncuk Yılmaz",            "role": "Saadet Koçovalı",        "image": "/img/saadet.png",
     "wiki": "https://en.wikipedia.org/wiki/Boncuk_Y%C4%B1lmaz",
     "info": "Koçovalı ailəsindən olan Saadet, serialda emosional dərinliyi olan bir xarakter olaraq öne çıxır.",
     "type": "protagonist", "seasons": [3, 4]},
    {"id": 18, "actor": "Cem Uslu",                 "role": "Metin Yaman",            "image": "/img/metin.jpg",
     "wiki": "https://tr.wikipedia.org/wiki/Cem_Uslu",
     "info": "Yaman ailəsindən olan Metin, Çukura nüfuz etməyə çalışan bir rəqibdir. Hiyləgər və qətiyyətli xarakteri onu təhlükəli bir düşmənə çevirir.",
     "type": "antagonist", "seasons": [3, 4]},
    {"id": 19, "actor": "Uğur Yıldıran",            "role": "Kemal Yaman",            "image": "/img/kemal.jpg",
     "wiki": "https://tr.wikipedia.org/wiki/U%C4%9Fur_Y%C4%B1ld%C4%B1ran",
     "info": "Yaman ailəsindən olan Kemal, qardaşı Metinlə birlikdə Çukurda hökm sürmək istəyir.",
     "type": "antagonist", "seasons": [3, 4]},
    {"id": 20, "actor": "Aytaç Uşun",               "role": "Mustafa Derbent (Meke)", "image": "/img/meke.jpg",
     "wiki": "https://www.imdb.com/name/nm5935295/",
     "info": "Derbent ailəsindən olan Meke, Çukurun rəngarəng simalarından biridir. Sadiq dostluğu və əyri-üyrü yolları ilə tamaşaçılarda iz buraxır.",
     "type": "protagonist", "seasons": [1, 2, 3]},
    {"id": 21, "actor": "Elif Doğan",               "role": "Müge Hale Atik",        "image": "/img/hale.jpg",
     "wiki": "https://en.wikipedia.org/wiki/Elif_Do%C4%9Fan",
     "info": "Çukura gəlib Koçovalı ailəsi ilə kəsişən Hale, serialda dramatik anlara sahib bir personajdır. Daxili ziddiyyətləri ilə mürəkkəb bir xarakter çizgisi var.",
     "type": "protagonist", "seasons": [2, 3]},
    {"id": 22, "actor": "İlayda Alişan",            "role": "Akşın Gümüş",           "image": "/img/akşın.jpg",
     "wiki": "https://en.wikipedia.org/wiki/%C4%B0layda_Ali%C5%9Fan",
     "info": "Gümüş ailəsindən olan Akşın, həm gözəlliyi həm də cəsarətiylə diqqət çəkir. Sevgi və sadaqət arasında sıkışıb qalan bir xarakter.",
     "type": "protagonist", "seasons": [2, 3]},
    {"id": 23, "actor": "Ece Yaşar",                "role": "Karaca Koçovalı",        "image": "/img/karaca.png",
     "wiki": "https://www.imdb.com/name/nm9253690/",
     "info": "Koçovalı ailəsinin güclü qızı. Karaca, hər cür çətinliyin öhdəsindən gələn, ailəsini qoruyan, inadkar bir personajdır.",
     "type": "protagonist", "seasons": [1, 2, 3, 4]},
    {"id": 24, "actor": "Mustafa Kırantepe",        "role": "Medet",                  "image": "/img/medet.jpg",
     "wiki": "https://www.imdb.com/name/nm3692062/",
     "info": "Koçovalıların etibarlı adamlarından biri. Medet, həmişə ailəyə sadiq qalan, söz dinləyən bir personajdır.",
     "type": "protagonist", "seasons": [1, 2, 3, 4]},
    {"id": 25, "actor": "Doğan Can Sarıkaya",       "role": "Acar Koçovalı",          "image": "/img/acar.jpg",
     "wiki": "https://www.imdb.com/name/nm9401075/",
     "info": "Koçovalı ailəsinin gənc nəslindən olan Acar. Enerjik və cəsur xarakteri ilə serialın dinamikasına güc qatır.",
     "type": "protagonist", "seasons": [3, 4]},
    {"id": 26, "actor": "Necip Memili",             "role": "Cumali Koçovalı",        "image": "/img/cumali.png",
     "wiki": "https://tr.wikipedia.org/wiki/Necip_Memili",
     "info": "İdrisin oğlu, Yamacın qardaşı. Qızmızaclıq xarakteri ilə tanınan Cumali, ailə naminə hər şeyi gözdən çıxarmağa hazırdır.",
     "type": "protagonist", "seasons": [1, 2, 3, 4]},
    {"id": 27, "actor": "Erkan Avcı",               "role": "Çeto",                   "image": "/img/çeto.jpg",
     "wiki": "https://en.wikipedia.org/wiki/Erkan_Avc%C4%B1",
     "info": "Çukurun köhnə dostlarından olan Çeto, Koçovalılarla yolu kəsişən rəngarəng bir personajdır. Sədaqəti şübhəli olsa da zəruri anlarda ortaya çıxır.",
     "type": "antagonist", "seasons": [1, 2]},
    {"id": 28, "actor": "Berkay Ateş",              "role": "Mahsun",                 "image": "/img/mahsun.jpg",
     "wiki": "https://en.wikipedia.org/wiki/Berkay_Ate%C5%9F",
     "info": "Çukurun sadiq sakinlərindən biri. Mahsun, vəfadarlığı və dostluğu ilə ön plana çıxır. Komik anlarıyla seriala yüngüllük gətirir.",
     "type": "protagonist", "seasons": [1, 2, 3]},
    {"id": 29, "actor": "Şenay Gürler",             "role": "Meliha",                 "image": "/img/meliha.jpg",
     "wiki": "https://en.wikipedia.org/wiki/%C5%9Eenay_G%C3%BCrler",
     "info": "Çukurun tanınmış simaları arasında olan Meliha, qadın gücünü və dözümlülüyünü simvolizə edir.",
     "type": "protagonist", "seasons": [1, 2]},
    {"id": 30, "actor": "Cihangir Ceyhan",          "role": "Azer Kurtuluş",          "image": "/img/azer.jpg",
     "wiki": "https://en.wikipedia.org/wiki/Cihangir_Ceyhan",
     "info": "Çukurun əsas antagonistlərindən biri. Azer Kurtuluş, Koçovalıların ən böyük düşmənlərindən olub məhəlləni ələ keçirmək üçün hər yolu sınayır.",
     "type": "antagonist", "seasons": [3, 4]},
    {"id": 31, "actor": "Burak Dakak",              "role": "Akın Koçovalı",          "image": "/img/akın.jpg",
     "wiki": "https://en.wikipedia.org/wiki/Burak_Dakak",
     "info": "Koçovalı ailəsinin gənc üzvü. Akın, böyüdükcə ailəsinin yolunu izləyir.",
     "type": "protagonist", "seasons": [3, 4]},
    {"id": 32, "actor": "Ahmet Melih Yılmaz",       "role": "Timsah Celil",           "image": "/img/timsah.jpg",
     "wiki": "https://en.wikipedia.org/wiki/Meli_Bendeli",
     "info": "Timsah ləqəbi ilə tanınan Celil, Çukurun qorxutucu simalarından biridir. Amansızlığı ilə tanınan Timsah Celil, düşmənlərini heç vaxt bağışlamır.",
     "type": "antagonist", "seasons": [2, 3]},
    {"id": 33, "actor": "Hare Sürel",               "role": "Damla Koçovalı",         "image": "/img/damla.jpg",
     "wiki": "https://en.wikipedia.org/wiki/Hare_S%C3%BCrel",
     "info": "Koçovalı ailəsinə gəlin gəlmiş Damla, zamanla Çukur həyatına uyum sağlamaq məcburiyyətindədir.",
     "type": "protagonist", "seasons": [2, 3]},
    {"id": 34, "actor": "Tansu Biçer",              "role": "Yücel Tansoy",           "image": "/img/yucel.jpg",
     "wiki": "https://en.wikipedia.org/wiki/Tansu_Bi%C3%A7er",
     "info": "Çukurda öz çıkarları üçün hərəkət edən Yücel, güc oyunlarında mühüm rol oynayır.",
     "type": "antagonist", "seasons": [1, 2]},
    {"id": 35, "actor": "Nejat İşler",              "role": "Çağatay Erdenet",        "image": "/img/cagatay_erdenet.jpeg",
     "wiki": "https://tr.wikipedia.org/wiki/Nejat_%C4%B0%C5%9Fler",
     "info": "Serialın ən güclü antagonistlərindən biri. Çağatay Erdenet, Çukuru tamamilə nəzarəti altına almaq istəyən bir iş adamıdır.",
     "type": "antagonist", "seasons": [4]},
]


class Command(BaseCommand):
    help = "Verilənlər bazasını ilkin məlumatlarla doldur (Season, SliderSlide, Person)"

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Əvvəlcə bütün mövcud məlumatları sil',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write("Köhnə məlumatlar silinir...")
            SliderSlide.objects.all().delete()
            Person.objects.all().delete()
            Season.objects.all().delete()
            self.stdout.write(self.style.WARNING("Silindi."))

        # ── 1. Seasons ──────────────────────────────────────────────────────
        self.stdout.write("Mövsümlər əlavə edilir...")
        season_map = {}  # num → Season instance
        for data in SEASONS_DATA:
            season, created = Season.objects.update_or_create(
                num=data["num"],
                defaults={
                    "year": data["year"],
                    "episodes": data["episodes"],
                    "image": data["image"],
                    "link": data["link"],
                    "desc": data["desc"],
                },
            )
            season_map[data["num"]] = season
            verb = "yaradıldı" if created else "yeniləndi"
            self.stdout.write(f"  Mövsüm {data['num']} {verb}")

        # ── 2. Slider slides ────────────────────────────────────────────────
        self.stdout.write("Slider məlumatları əlavə edilir...")
        for data in SLIDES_DATA:
            season_obj = season_map.get(data["order"])  # order == season num
            slide, created = SliderSlide.objects.update_or_create(
                label=data["label"],
                defaults={
                    "image": data["image"],
                    "year": data["year"],
                    "link": data["link"],
                    "order": data["order"],
                    "season": season_obj,
                },
            )
            verb = "yaradıldı" if created else "yeniləndi"
            self.stdout.write(f"  {data['label']} {verb}")

        # ── 3. Persons ──────────────────────────────────────────────────────
        self.stdout.write("Personajlar əlavə edilir...")
        for i, data in enumerate(PERSONS_DATA):
            person, created = Person.objects.update_or_create(
                id=data["id"],
                defaults={
                    "actor_name": data["actor"],
                    "role_name": data["role"],
                    "image": data["image"],
                    "wikipedia": data["wiki"],
                    "role_info": data["info"],
                    "role_type": data["type"],
                    "order": i + 1,
                },
            )
            # ManyToMany seasons
            person.seasons.set([season_map[n] for n in data["seasons"] if n in season_map])
            verb = "yaradıldı" if created else "yeniləndi"
            self.stdout.write(f"  {data['role']} ({data['actor']}) {verb}")

        self.stdout.write(self.style.SUCCESS(
            f"\nTamamlandı: {len(SEASONS_DATA)} mövsüm, "
            f"{len(SLIDES_DATA)} slide, "
            f"{len(PERSONS_DATA)} personaj DB-yə əlavə edildi."
        ))
