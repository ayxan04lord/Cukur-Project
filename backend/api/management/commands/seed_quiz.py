"""
python manage.py seed_quiz          — quiz suallarını əlavə et
python manage.py seed_quiz --clear  — sıfırla və yenidən əlavə et
"""
from django.core.management.base import BaseCommand
from api.models import QuizQuestion

QUESTIONS = [
    # ── ASAN ──────────────────────────────────────────────────────────────────
    {
        "question": "Yamaç Koçovalı Çukur'a niyə qayıdır?",
        "a": "İş tapmaq üçün",
        "b": "Sevgilisi Sena ilə görüşmək üçün",
        "c": "Qardaşı Selimin problemi ucbatından",
        "d": "Atasının tapşırığı ilə",
        "correct": "C",
        "difficulty": "easy",
        "category": "events",
        "explanation": "Selim Koçovalının düşdüyü problem Yamacı yenidən Çukur'a çəkib gətirir.",
    },
    {
        "question": "İdris Koçovalı serialda hansı rolu oynayır?",
        "a": "Polisdir",
        "b": "Çukur məhəlləsinin patriarxıdır",
        "c": "Bir iş adamıdır",
        "d": "Müəllimdir",
        "correct": "B",
        "difficulty": "easy",
        "category": "family",
        "explanation": "İdris Koçovalı ailəsinin rəhbəri və Çukur məhəlləsinin idarəçisidir.",
    },
    {
        "question": "Vartolu Saadettin serialın əvvəlində Koçovalılara qarşı mı idi?",
        "a": "Xeyr, həmişə dost idi",
        "b": "Bəli, əvvəlcə rəqib idi",
        "c": "Heç bir əlaqəsi yox idi",
        "d": "Polis idi",
        "correct": "B",
        "difficulty": "easy",
        "category": "characters",
        "explanation": "Vartolu əvvəlcə Koçovalıların rəqibi idi, lakin sonradan ən etibarlı müttəfiqə çevrildi.",
    },
    {
        "question": "Sena Koçovalı serialda hansı ailədən gəlir?",
        "a": "Kasıb bir ailədən",
        "b": "Koçovalı ailəsindən",
        "c": "Varlı bir ailədən",
        "d": "Xaricdən gəlmişdir",
        "correct": "C",
        "difficulty": "easy",
        "category": "romance",
        "explanation": "Sena varlı bir ailənin qızıdır və Yamaç ilə tanışdıqdan sonra həyatı dəyişir.",
    },
    {
        "question": "Cumali Koçovalı hansı xüsusiyyəti ilə tanınır?",
        "a": "Çox sakit və səbirlidir",
        "b": "Tez alovlanan, qızğın xarakteridir",
        "c": "Həmişə qaçmağı seçir",
        "d": "Sülhsevər birisidir",
        "correct": "B",
        "difficulty": "easy",
        "category": "family",
        "explanation": "Cumali Koçovalı qızğın xarakteri, tez alovlanması ilə tanınır.",
    },
    {
        "question": "Aliço Çukur'da hansı rol oynayır?",
        "a": "Koçovalıların düşmənidir",
        "b": "Koçovalılara sadiq sakindir",
        "c": "Polis agentidir",
        "d": "Məhəllənin müdiridir",
        "correct": "B",
        "difficulty": "easy",
        "category": "characters",
        "explanation": "Aliço Çukur'un sadiq sakinlərindən olub Koçovalı ailəsinə bağlıdır.",
    },
    {
        "question": "Sultan Koçovalı serialda hansı sifəti ilə seçilir?",
        "a": "Zəif və qorxaq bir qadındır",
        "b": "Möhkəm iradəli, ailəsini qoruyan güclü bir qadındır",
        "c": "Ailəsindən uzaq durur",
        "d": "Yalnız ev işləri ilə məşğul olur",
        "correct": "B",
        "difficulty": "easy",
        "category": "family",
        "explanation": "Sultan Koçovalı serialın ən güclü qadın obrazlarından biri hesab edilir.",
    },
    {
        "question": "Karaca Koçovalı kimdir?",
        "a": "Koçovalı ailəsinin gəlinidir",
        "b": "Koçovalı ailəsinin güclü qızıdır",
        "c": "Qonşu ailənin qızıdır",
        "d": "Bir polisdir",
        "correct": "B",
        "difficulty": "easy",
        "category": "family",
        "explanation": "Karaca Koçovalı ailəsinin inadkar qızıdır.",
    },

    # ── ORTA ──────────────────────────────────────────────────────────────────
    {
        "question": "Baykal Kent Çukur'da nə etmək istəyirdi?",
        "a": "Koçovalılarla dost olmaq",
        "b": "Çukur üzərindəki nüfuzu ələ keçirmək",
        "c": "Məhəllədən köçmək",
        "d": "Polis olmaq",
        "correct": "B",
        "difficulty": "medium",
        "category": "enemies",
        "explanation": "Kent ailəsinin başçısı Baykal, Çukur üzərindəki hakimiyyəti ələ keçirmək istəyirdi.",
    },
    {
        "question": "Selim Koçovalı serialın əvvəlində hansı problemlə üzləşirdi?",
        "a": "İş problemi yaşayırdı",
        "b": "Sərxoş həyat tərzi sürürdü",
        "c": "Ailə ilə münaqişə edirdi",
        "d": "Xaricdə yaşayırdı",
        "correct": "B",
        "difficulty": "medium",
        "category": "family",
        "explanation": "Selim sərxoş həyat tərzi ilə tanınırdı, lakin zamanla özünü tapdı.",
    },
    {
        "question": "Çağatay Erdenet Çukur'da hansı məqsəd güdürdü?",
        "a": "Koçovalılara kömək etmək",
        "b": "Çukuru tamamilə nəzarəti altına almaq",
        "c": "Məhəllədə mağaza açmaq",
        "d": "Ailə qurmaq",
        "correct": "B",
        "difficulty": "medium",
        "category": "enemies",
        "explanation": "Çağatay Erdenet serialın 4-cü mövsümünün ən güclü antagonistidir.",
    },
    {
        "question": "Vartolu Saadettin Koçovalılara nə zaman tam sadiq oldu?",
        "a": "Serialın ilk epizodundan",
        "b": "Zaman keçdikcə, güvən qazandıqdan sonra",
        "c": "Heç vaxt tam sadiq olmadı",
        "d": "Yalnız pul üçün sadiq idi",
        "correct": "B",
        "difficulty": "medium",
        "category": "characters",
        "explanation": "Vartolu zamanla Koçovalıların ən etibarlı müttəfiqlərindən birinə çevrildi.",
    },
    {
        "question": "Muhittin Derbent serialda hansı mövqedə idi?",
        "a": "Həmişə Koçovalıların düşməni idi",
        "b": "Həm düşmən, həm də müttəfiq ola bilən çoxşaxəli personaj",
        "c": "Yalnız Koçovalılarla iş birliyi edirdi",
        "d": "Serialda qısa müddət yer aldı",
        "correct": "B",
        "difficulty": "medium",
        "category": "enemies",
        "explanation": "Muhittin Derbent mürəkkəb bir personaj olaraq həm rəqib, həm müttəfiq ola bilirdi.",
    },
    {
        "question": "Yamaç ilə Sena arasındakı sevgi xətti serialda nəyi simvolizə edir?",
        "a": "Yalnız romantik bir əlaqəni",
        "b": "İki fərqli dünyanın — küçə həyatı ilə varlı həyatın toqquşmasını",
        "c": "Ailə münaqişəsini",
        "d": "İş ortaqlığını",
        "correct": "B",
        "difficulty": "medium",
        "category": "romance",
        "explanation": "Yamaç-Sena sevgisi serialın əsas dramatik xəttini oluşturan, iki fərqli dünyanın toqquşmasıdır.",
    },
    {
        "question": "Timsah Celil ləqəbi bu personaja niyə verilmişdir?",
        "a": "Timsah kimi üzə bildiyi üçün",
        "b": "Amansızlığı və düşmənlərini bağışlamaması ilə",
        "c": "Yaşıl gözləri olduğu üçün",
        "d": "Bataqlıqda yaşadığı üçün",
        "correct": "B",
        "difficulty": "medium",
        "category": "characters",
        "explanation": "Timsah Celil amansız və bağışlamaz xarakteri ucbatından bu ləqəbi qazanmışdır.",
    },
    {
        "question": "Kahraman Koçovalı uzun müddət ailədən uzaq qaldıqdan sonra nə baş verdi?",
        "a": "Ailə onu qucaq açıq qarşıladı",
        "b": "Qayıdışı ciddi gərginliklərə səbəb oldu",
        "c": "Heç kim onu tanımadı",
        "d": "Dərhal Çukur'un idarəçisi oldu",
        "correct": "B",
        "difficulty": "medium",
        "category": "family",
        "explanation": "Kahraman Koçovalının qayıdışı ailə daxilindəki tarazlığı pozaraq ciddi gərginliklərə yol açdı.",
    },
    {
        "question": "Nazım Kent öz atası Baykal Kentdən nəyi miras aldı?",
        "a": "Sülhsevər bir xarakteri",
        "b": "Çukur üzərindəki hakimiyyəti ələ keçirmə istəyini",
        "c": "Koçovalılarla dostluğu",
        "d": "Polis sertifikatını",
        "correct": "B",
        "difficulty": "medium",
        "category": "enemies",
        "explanation": "Nazım, atasının izini gedərək Çukur üzərindəki hakimiyyəti ələ keçirməyə çalışdı.",
    },

    # ── ÇƏTİN ─────────────────────────────────────────────────────────────────
    {
        "question": "Serialın hansı mövsümündə Yamaç Koçovalı ən böyük fərdi qurbanları verdi?",
        "a": "1-ci mövsümdə",
        "b": "2-ci mövsümdə",
        "c": "3-cü mövsümdə",
        "d": "4-cü mövsümdə",
        "correct": "C",
        "difficulty": "hard",
        "category": "events",
        "explanation": "3-cü mövsüm Yamacın ən dramatik qurbanlar verdiyi mövsüm kimi xarakterizə edilir.",
    },
    {
        "question": "Azer Kurtuluş serialın hansı mövsümündə əsas antagonist kimi meydana çıxdı?",
        "a": "1 və 2-ci mövsümdə",
        "b": "3 və 4-cü mövsümdə",
        "c": "Yalnız 2-ci mövsümdə",
        "d": "Bütün mövsümlərdə",
        "correct": "B",
        "difficulty": "hard",
        "category": "enemies",
        "explanation": "Azer Kurtuluş 3 və 4-cü mövsümlərdə əsas düşmən olaraq güclü bir antagonist idi.",
    },
    {
        "question": "Çukur serialında 'Çukur' sözü nəyi simvolizə edir?",
        "a": "Bir çayı",
        "b": "Bir dağı",
        "c": "İstanbul'un dar bir məhəlləsini — həm coğrafi, həm mənəvi anlamda bir uçurum",
        "d": "Bir həbsxananı",
        "correct": "C",
        "difficulty": "hard",
        "category": "general",
        "explanation": "Çukur həm fiziki bir məhəlləni, həm də personajların düşdüyü mənəvi uçurumu simvolizə edir.",
    },
    {
        "question": "Celasun Gümüş başlanğıcda Koçovalılarla necə münasibətdə idi?",
        "a": "Həmişə onların müttəfiqi idi",
        "b": "Gümüş ailəsindən olaraq əvvəl ayrı bir cəbhədə dururdu, sonra yaxınlaşdı",
        "c": "Koçovalıların qohumudur",
        "d": "Serialın əvvəlindən yox idi",
        "correct": "B",
        "difficulty": "hard",
        "category": "characters",
        "explanation": "Celasun Gümüş ailəsindən gəlir, zamanla Koçovalılarla yaxın münasibət qurdu.",
    },
    {
        "question": "Metin Yaman serialda hansı strategiyadan istifadə edirdi?",
        "a": "Açıq hərbi gücə",
        "b": "Hiylə, aldatma və diplomatik manipulyasiyaya",
        "c": "Yalnız pula",
        "d": "Ailə bağlarına",
        "correct": "B",
        "difficulty": "hard",
        "category": "enemies",
        "explanation": "Metin Yaman hiyləgər xarakteri ilə tanınırdı — açıq mübarizə yerinə manipulyasiyadan istifadə edirdi.",
    },
    {
        "question": "Serialın son mövsümündə Koçovalı ailəsinin son hədəfi nə idi?",
        "a": "Çukur'dan köçmək",
        "b": "Çukurun tam nəzarətini ələ keçirib qorumaq",
        "c": "Barışıq bağlamaq",
        "d": "Polis olmaq",
        "correct": "B",
        "difficulty": "hard",
        "category": "events",
        "explanation": "Son mövsümdə Koçovalılar Çukurun tam hakimiyyəti üçün son böyük döyüşə çıxdı.",
    },
    {
        "question": "Emmi (Mücahit) Çukur sakinləri arasında hansı xüsusi rol daşıyırdı?",
        "a": "Silah taciri idi",
        "b": "Hər kəsin problemini dinləyən, məsləhət verən bir akil kişi idi",
        "c": "Məhəllənin polis rəisi idi",
        "d": "Koçovalıların rəqibi idi",
        "correct": "B",
        "difficulty": "hard",
        "category": "characters",
        "explanation": "Emmi bütün mövsümlər boyu sakinlərə məsləhət verən, hörmət qazanmış bir simaya çevrildi.",
    },
    {
        "question": "Damla Koçovalının serialdakı dramatik gərginliyinin əsas səbəbi nə idi?",
        "a": "Pul problemi",
        "b": "Koçovalı ailəsinin sert həyat şərtlərinə uyum sağlamaq məcburiyyəti",
        "c": "Başqa bir şəhərə köçmək istəyi",
        "d": "Koçovalılardan qaçmaq cəhdi",
        "correct": "B",
        "difficulty": "hard",
        "category": "romance",
        "explanation": "Damla gəlin kimi Çukur'un ağır həyat şərtlərinə uyum sağlamağa məcbur qaldı.",
    },
    {
        "question": "Çukur serialında Koçovalı ailəsinin güc qaynağı nə idi?",
        "a": "Pul və silah",
        "b": "Ailə birliyi, sədaqət və məhəlləyə sahib çıxma ruhu",
        "c": "Siyasi əlaqələr",
        "d": "Xarici müttəfiqləri",
        "correct": "B",
        "difficulty": "hard",
        "category": "family",
        "explanation": "Koçovalıların əsas gücü hər zaman ailə birliyi, sədaqət və Çukur'a məhəbbəti olmuşdur.",
    },
]


class Command(BaseCommand):
    help = "Quiz suallarını DB-yə əlavə et"

    def add_arguments(self, parser):
        parser.add_argument('--clear', action='store_true', help='Əvvəlcə sil')

    def handle(self, *args, **options):
        if options['clear']:
            count = QuizQuestion.objects.count()
            QuizQuestion.objects.all().delete()
            self.stdout.write(self.style.WARNING(f"{count} sual silindi."))

        created = 0
        for q in QUESTIONS:
            _, was_created = QuizQuestion.objects.get_or_create(
                question=q['question'],
                defaults={
                    'option_a':    q['a'],
                    'option_b':    q['b'],
                    'option_c':    q['c'],
                    'option_d':    q['d'],
                    'correct':     q['correct'],
                    'difficulty':  q['difficulty'],
                    'category':    q['category'],
                    'explanation': q.get('explanation', ''),
                    'is_active':   True,
                }
            )
            if was_created:
                created += 1
                diff_label = {'easy': 'Asan', 'medium': 'Orta', 'hard': 'Çətin'}[q['difficulty']]
                self.stdout.write(f"  [{diff_label}] {q['question'][:60]}...")

        self.stdout.write(self.style.SUCCESS(
            f"\nTamamlandı: {created} yeni sual, {len(QUESTIONS) - created} mövcud idi."
        ))
