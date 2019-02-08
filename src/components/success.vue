<script>
  import JTop from './top.vue'
  import { mapState } from 'vuex'
  import isEmpty from 'lodash/isEmpty'

  export default{
    components: {
      JTop
    },
    computed: {
      ...mapState('Chat', ['sucesso'])
    },
    methods: {
      voltar () {
        this.$emit('voltar')
      },
      goToSite () {
        window.location.href = 'http://www.jn2.com.br'
      }
    },
    beforeMount () {
      if (isEmpty(this.sucesso)) {
        this.goToSite()
      }
    }
  }
</script>

<template>
  <q-layout>
    <j-top :titulo="sucesso.tituloTop" :subTitulo="sucesso.subTituloTop" @voltar="voltar" :btnVoltar="false"></j-top>
    <div class="modalBody">
         <h3 class="titulo">{{ sucesso.titulo }}</h3>
         <p class="subTitulo">{{ sucesso.subTitulo }}</p>
         <p class="subTitulo2">{{ sucesso.subTitulo2 }}</p>
         <a href="https://www.jn2.com.br" class="back-site" >Voltar para o site</a>
    </div>
    <div class="logo-jn2">
      <img src="../statics/jn2-logo-2.svg"/>
      <p>JN2 © 2018 COPYRIGHT</p>
    </div>
  </q-layout>
</template>

<style lang="scss">
    @import "../statics/styles/style.scss";
    .logo-jn2{
      position: absolute;
      left: 50%;
      top: 85%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      p{
        text-align: center;
        font-size: .7em;
        color: #4e4e4e;
        padding: 1em 0 0 0;
      }
      img{
        width: 120px;
        height: auto;
      }
    }
    .modalBody{
        text-align: center;
        font-family: 'Rajdhani', sans-serif;
        min-width: 95%;
        position: absolute;
        left: 50%;
        top: 41%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 20px;
        padding: 1.5em 0;
        @media (min-width: 1024px){
          width: 60%;
          min-width: 60%;
        }
        .subTitulo{
            font-weight: 400;
            font-size: 18px;
        }
        .subTitulo2{
            font-size: 14px;
            font-weight: bold;
        }
        h3{
            margin: 0;
            padding: 0 0 .6em;
            font-size: 26px;
            font-weight: 400;
        }
        p{
            font-size: 1.3em;
            padding: 0 .8em;
        }
        .back-site{
            border-radius: 25px;
            background-color: #381081;
            padding: 0.6em 1em;
            border: none;
            color: #fff;
            font-weight: 500;
            margin: 1.2em auto 0;
            display: block;
            max-width: 200px;
        }
    }
    .q-card > div{
            &:first-child{
                padding: 20px 16px 16px;
                background: #5c00d6;

            }
            &:last-child{
                background-color: #fff !important;
                padding: 18px 25px 25px;
            }
            .q-card-title{
                color: #fff;
                font-family: 'Rajdhani', sans-serif;
                font-size: 2em;
                font-weight: 800;
                text-align: center;
                text-transform: uppercase;
                padding:.1em 0 0 0;
                p{
                    color: #fff;
                    margin: 0;
                    text-transform: initial;
                    line-height: initial;
                    padding: 10px 0 0 0;
                }
            }
            .q-list{
                background-color: #fff;
            }
    }
    .q-item {
        padding: .3em 0 .3em 3em;
        min-height: 30px;
    }
    .q-card {
        border-radius: 10px;
        margin: 30px 20px;
        .q-item{
            &:nth-child(2n-1){
                background-color: #fff;
            }
        }
        .q-list{
            background-color: #fff;
            padding: 0 0 8px 0;
        }
        .header-card{
            margin: 0 0 15px;
            .plano-exclusivo{
                padding: 1em 1.5em 0.3em;
            }
            h2{
                font-family: 'Rajdhani', sans-serif;
                margin: 0;
                background-color: #fff;
                text-align: center;
                font-size: 2.5em;
                font-weight: 500;
                padding: 1em 1.5em 0.7em;
                color: #5c00d6;
                line-height: .6em;
                position: relative;
                border-bottom: 1px solid #d8d8d8;
                .card-mes{
                    font-size: .5em;
                }
                .tx-unica {
                    display: block;
                    font-size: .4em;
                    color: #707070;
                }
                .a-partir{
                    position: absolute;
                    left: 88px;
                    font-size: 14px;
                    top: 12px;
                }
            }
        }
        .q-item-side {
            min-width: initial;
         }
        .text-primary {
            color: #00ec85 !important;
            font-size: 8px;
            padding: 0 0 5px;
        }
        .q-item-label{
            color: #000000;
            font-family: 'Rajdhani', sans-serif;
            font-size: 1em;
            font-weight: 500;
        }
        .q-card-separator {
            background: rgb(216, 216, 216);
        }
        .btn-card-actions{
            font-weight: 600;
            border-radius: 25px;
            padding: 10px 0;
            font-size: 1em;
            font-family: 'Rajdhani', sans-serif;
            width: calc(50% - 5px);
            letter-spacing: -1px;
        }
        .btn-card{
            font-weight: 600;
            border-radius: 25px;
            padding: 10px 0;
            font-size: 1em;
            font-family: 'Rajdhani', sans-serif;
            width: calc(50% - 5px);
            letter-spacing: -1px;
            &:first-child{
                background-color: #f12d2d !important;
            }
            &:last-child{
                background-color: #2c7b31 !important;
            }
            .q-icon{
                font-size: 1em;
            }
        }
        .red{
            background-color: $orange-alt !important;
        }
        .botoes-card{
            background-color: #fff;
            padding: 25px 0;
            .bnt-mais-info{
                background-color: #00B74F;
                border-radius: 35px;
                margin: 0 auto .7em;
                color: #ffffff;
                padding: 1em 1.5em;
                display: block;
            }
            .bnt-receber{
                background-color: transparent;
                border-radius: 35px;
                margin: 0 auto .7em;
                color: #5c00d6;
                border: 2px solid #5c00d6;
                padding: .9em 1.5em;
                display: block;
            }
            .bnt-detalhes{
                background-color: transparent;
                font-weight: 300;
                border-radius: 35px;
                margin: 0 auto;
                color: #000;
                border: 1px solid #b2b2b2;
                padding: 1em 1.5em;
                display: block;
                text-transform: normal;
            }
            .btn-tel{
                background-color: #5c00d6;
                font-weight: 600;
                border-radius: 35px;
                margin: 0 auto;
                color: #fdfdfd;
                padding: .5em;
                display: block;
                text-transform: normal;
                font-size: 1.3em;
                max-width: 176px;
            }
            .tel-label{
                text-align: center;
                font-size: 10px;
                color: #636363;
                margin: 0 0 .6em;
            }

        }
    }
    .q-card.plano-exclusivo{
            > div{
                &:first-child{
                    background: #323131;
            }
        }
        .btn-fale-consultor{
            position:relative;
            color: #000;
            width: 8em;
            display: block;
            margin: 0 auto 1em;
            text-align: center;
            padding:.3em;
            font-weight: 400;
            &:after{
                content: "";
                position: absolute;
                background: url("../statics/icon_phone.png") no-repeat center center;
                width: 19px;
                height: 20px;
                display: block;
                top: 22px;
                right: 0px;
            }

        }
        .header-card{
            margin: 0;
            border-bottom: 1px solid #ddd;
            h2{
                padding: 1em 1.5em 0.3em;
                background-color: #fff;
                color: #000;
            }
        }
        .sub-header-card{
            padding: 1em;
            text-align: center;
            background-color: #fff;
            border-bottom: 1px solid #ddd;
            p{
                margin: 0;
                font-size: 1.3em;
                color: #6b6b6b;
                line-height: 1.3em;
                font-weight: 300;
            }
        }
        .q-list{
            padding: 15px 0;
        }
    }
</style>
