import fitz
from pprint import pprint

# ドキュメントを開く
data = "C:\Users\ayuto\探究\react-sch - コピー\src\components\data\test.pdf"
doc = fitz.open(data)

# ページを取得する
page = doc[0]

# ページ上にあるテーブルを検出する
tabs = page.find_tables()

# 検出されたテーブルの数を表示する
print(f"{len(tabs.tables)}個のテーブルが{page}上に見つかりました")

# 少なくとも1つのテーブルが見つかった場合
if tabs.tables:
    # 最初のテーブルの内容を表示する
    pprint(tabs[0].extract())