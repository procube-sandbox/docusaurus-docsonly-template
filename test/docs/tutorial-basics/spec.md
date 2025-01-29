# pub-workflow-doc/pull/28

1. grib2からgeosoboに変換する処理を、grib2からPNGタイルを作成する処理に変更
    - 既存のgeosoboへの変換は処理時間の問題があったため。
    - PNGタイル作成では大幅な処理時間の短縮が行えたため。

参照先：[https://github.com/sobo-gen3v1/pub-workflow-doc/pull/28]([https://github.com/sobo-gen3v1/pub-workflow-doc/pull/28)

## 気象庁 気象庁アデスシステム 高解像度降水ナウキャスト<br/>(jma-adess-NOWC-sobo)

### ワークフロー単体テスト

```yaml format_as_test_table
- id: jma-adess-NOWC-sobo
  status: OK
  spec: PNGタイルが作成され、コンテンツサービスに登録する。
  procedure: テスト対象のyaml、file、categoryを指定して、sh $DIR/$｛SOBODEV｝/work/do_curl.sh $FILE $EXT $CATEGORY を実行
  expects: |  
    コンテンツサービスにPNGタイルが登録されていることを確認する。
    ・指定したズームレベルのPNGタイルが作成されていることを確認する。
```

### 検証環境での結合テスト

```yaml format_as_test_table
- id: jma-adess-NOWC-sobo
  status: OK
  spec: SOBO-WEB向けデータ変換し、コンテンツサービス・業務ＤＢへ登録する
  procedure: テスト対象のyaml、file、categoryを指定して、sh $DIR/$｛SOBODEV｝/work/do_curl.sh $FILE $EXT $CATEGORY を実行
  expects: ・コンテンツサービスにPNGタイルが登録されていること。<br/>・業務ＤＢへ登録されていること。
  comments: |
    テスト実施環境等
    実施環境： クラウド検証環境  
    WFプロセスID： 01J5WHRJ1RX31JSXB99GWBZ3XY
```
