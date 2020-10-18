---
title: "[R]brmsでhorseshoeによるスパース回帰"
date: 2020-08-14T11:59:19+09:00
draft: true

categories: ["R"]
cover: "/my_blog/img/image_baikinR_hs.jpg"
tags: ["R","日記"]
summary: "par_ratio=p/Dでおわり"

---

  どうも。     
  
  今日は**brms**で馬蹄事前分布 (horseshoe prior：以下馬) を用いた回帰分析の仕方を紹介します。  
  
ベイズでスパース回帰するときの利点  
    1. 回帰係数の分散が95%確信区間により簡便に評価できる   
    2. ベイズである  
    
  馬はベイズでスパース回帰するときの一つの選択肢で、近年そのハイパーパラメータの設定がいろいろ提案されてます。
  [van Erp et al. 2019のシミュレーション研究](https://www.sciencedirect.com/science/article/pii/S0022249618300567?via%3Dihub)からわかるように、Regularized horseshoe(以下R馬)とよばれる分布がベイジアンスパース回帰の中でもまずまずの性能、といった感じですね。
  
  R馬は自分の予測した説明変数の数を事前情報として組み込む事前分布で、通常の馬よりも収束しやすくデータと説明変数の数が近い状態でも割といい感じの結果を出力します (詳しくはvan Erp et al. 2019や馬蹄事前分布を愛しすぎてしまった研究者[Piironenらの研究](https://arxiv.org/abs/1707.01694)を参照して下さい)。    
  
  brmsでのR馬の実装方法は以下の通りです。必要な引数(=set_prior("horseshoe(par_ratio=p/D)"))を入力すれば簡単に行うことができます。  
  
  
    
```r:horseshoe
library(brms)

# サンプルです。走らせても動きません。
# par_ratio = p/Dのpは予測した説明変数の数、Dは全部の予測説明変数の数です。
summary(brm(y  ~ x1 + ... + x100, 
            data=data, prior = set_prior("horseshoe(par_ratio=p/D)"),
            control=list(adapt_delta = 0.999, max_treedepth=15)))

```

  ちなみに馬蹄事前分布を普通に使った場合にはcontrolの設定は必須な場合が多いです。R馬だと多少はましになりますが、まぁ一応つけておきましょう。
  いうまでもありませんが、常にR馬が最強というものではないことにご注意を。  
  stanベースの[bayesregパッケージ](https://github.com/sara-vanerp/bayesreg)というのもあるみたいです。これで様々なベイジアンスパース回帰分析をひょひょいっとできそうですね。僕はまだ試してませんが。
  今回は以上です。ただの備忘録でした。