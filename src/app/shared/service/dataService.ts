/*import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CatalogItem, Item } from './store.service';
import { PreloadService } from './preload.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private catalogData: CatalogItem[] = [
    {
      id: '#1 Pacchetto ',
      name: '',
      category: 'tuttorifiuto',
      year: '2023-2024',
      items: [
        { id: 'item1', url: 'assets/video/COMUNICATO.mp4', previewUrl: 'assets/img/copertine/comunicato_copertina.jpeg' },
        { id: 'item2', url: 'assets/audio/comunicato_v2.mp3', previewUrl: 'assets/img/copertine/dhl.jpg' },
        { id: 'item3', url: 'assets/volantini/occhio_fronte.png', previewUrl: 'assets/volantini/occhio_fronte.png' },
        { id: 'item4', url: 'assets/pdf/POESIE1.pdf', previewUrl: 'assets/img/copertine/copertina_poesie.png' },
        { id: 'item5', url: 'assets/audio/È_ora_di_andare_a_dormire.mp3', previewUrl: 'assets/img/copertine/inizio?_fine?.jpg' },

        { id: 'item', url: 'https://media.gqitalia.it/photos/5d60131f1c0b03000814bc43/1:1/w_1657,h_1657,c_limit/GettyImages-845711818.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'ite', url: 'assets/audio/finto-uomo.mp3', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
      ]
    },
  ];

  constructor(private preloadService: PreloadService) {}

  getCatalogMetadata() {
    const metadata = this.catalogData.map(({ id, name, category, year, items }) => ({
      id, name, category, year, items: items.map(({ id, url, previewUrl }: { id: string; url: string; previewUrl: string }) => ({ id, url, previewUrl }))
    }));
    return of(metadata); // Simulated delay
  }

  getItemDetails(catalogId: string, itemId: string) {
    const catalog = this.catalogData.find(catalog => catalog.id === catalogId);
    const item = catalog?.items.find((item: any) => item.id === itemId);
    return of(item); // Simulated delay
  }

  preloadItems() {
    this.catalogData.forEach(catalog => {
      catalog.items.forEach((item: any) => {
        this.preloadService.preload(item.previewUrl).catch(err => console.error(`Failed to preload ${item.previewUrl}:`, err));
      });
    });
  }
}*/



/* private catalogData: CatalogItem[] = [
    {
      id: '#1 Pacchetto ',
      name: '',
      category: 'Tech/Gaming',
      year: '2023-2024',
      items: [
        { id: 'item1', url: 'https://media.gqitalia.it/photos/5d60131f1c0b03000814bc43/1:1/w_1657,h_1657,c_limit/GettyImages-845711818.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item2', url: 'assets/audio/finto-uomo.mp3', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },

      ]
    },
    {
      id: 'nk-0015',
      name: 'Arcadia',
      category: 'Tech/Gaming',
      year: '2023-2024',
      items: [
        { id: 'item4', url: 'assets/pdf/TRENOS.pdf', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' },
        { id: 'item5', url: 'assets/video/INTERMEZZO.mp4', previewUrl: 'assets/img/photo_5927090164977484088_y.jpg' }
      ]
    }
  ];*/
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CatalogItem, Item } from './store.service';
import { PreloadService } from './preload.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseBlobUrl = 'https://4neiag8fyznbz2a8.public.blob.vercel-storage.com';

  private catalogData: CatalogItem[] = [
    {
      id: '#1 Pacchetto ',
      name: '',
      category: 'tuttorifiuto',
      year: '2023-2024',
      items: [
        { id: '1', url: `${this.baseBlobUrl}/video/COMUNICATO-qtg1phrL57B6azJdDxdUlPKOwNG7XM.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/comunicato_copertina-arO08anOsWQDkSLSuBmL63baZ1sFxe.jpeg` },
        { id: '2', url: `${this.baseBlobUrl}/audio/comunicato_v2-volWooMd96L7QBlBcGnisUoZlNTBL7.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/dhl-l4c31cxgk25xpm5C0Qh5Vkr88kKJo6.jpg` },
        { id: '3', url: `${this.baseBlobUrl}/volantini/occhio_fronte-Mxh1WcFE3EyovIMgzMi6wjtp8YlumC.png`, previewUrl: `${this.baseBlobUrl}/volantini/occhio_fronte-Mxh1WcFE3EyovIMgzMi6wjtp8YlumC.png` },
        { id: '4', url: `${this.baseBlobUrl}/pdf/POESIE1-vEdxk6RetiAycUqJAyF8jAFdUF3fgg.pdf`, previewUrl: `${this.baseBlobUrl}/img/copertine/copertina_poesie-244DvzDWX2ycIIPSGRFIvj3DtzrZWt.png` },
        { id: '5', url: `${this.baseBlobUrl}/audio/È_ora_di_andare_a_dormire-Ruwac8EDoOToaCRzbP5WlVnVV973Hw.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/inizio%253F_fine%253F-WheSGShvcoatuqr4R7QwGiTILUtzlF.jpg` },
        { id: '6', url: `${this.baseBlobUrl}/volantini/techne-qwt2iIBljOkQ0Ut1XHJoPOvXFTVcWy.png`, previewUrl: `${this.baseBlobUrl}/volantini/techne-qwt2iIBljOkQ0Ut1XHJoPOvXFTVcWy.png` },
        { id: '7', url: `${this.baseBlobUrl}/video/FIGLIDIUNOSTESSODIO-g7nB9mR0SCjKw4LxPOcz95F8sWWm9y.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/figli_di_uno_stesso_dio-5FGnoksAUo3ZtZS6LbydoyhbhM3cgS.png` },
        { id: '8', url: `${this.baseBlobUrl}/audio/Finto_uomo-AIHLrGN2a1r14rLFsSILUjRXVorZj2.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/solo_un_uomo-oS1N5foHaiStj1JJy8tN4fIEx9F6sg.jpg` },
        { id: '9', url: `${this.baseBlobUrl}/volantini/Kali_1-TQyaYBVGoyO11PnfvKO2F1BPmF9LvO.png`, previewUrl: `${this.baseBlobUrl}/volantini/Kali_1-TQyaYBVGoyO11PnfvKO2F1BPmF9LvO.png` },
        { id: '10', url: `${this.baseBlobUrl}/video/INTERMEZZO-9J3QLSP08V1AE0PEIUoR1dbXF2vUEg.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/intermezzo-IHJDGlayZt76VSf4lwopOHp7oxYYY9.png` },
        { id: '11', url: `${this.baseBlobUrl}/pdf/TRENOS-q9LhNkk9ADxPaeVXJFOQ7lLLJtYcS1.pdf`, previewUrl: `${this.baseBlobUrl}/img/copertine/copertina_trenos-U05liNJimbxn3th0Kn2MPzPPMpChUm.png` },
        { id: '12', url: `${this.baseBlobUrl}/volantini/primirdial-ERsgzJycWdG8GeC7miEIzWrXS0SgV3.jpg`, previewUrl: `${this.baseBlobUrl}/volantini/primirdial-ERsgzJycWdG8GeC7miEIzWrXS0SgV3.jpg` },
        { id: '13', url: `${this.baseBlobUrl}/audio/La_legge_sul_(mio)_divorzio-TLE4iaRgTJYVSE8gO0KTUxxXXay3cX.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/scarpe_di_papà-FQRlFUiKjJffHr6Pa4bekhTfdP114i.jpg` },
        { id: '14', url: `${this.baseBlobUrl}/video/FATTOAMANO-9KyreKhwYhfnUg0S0ua7Ykq7kpgEOf.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/handmade_fatto_a_mano-bKnsyEOJq0A2NuaXelb43s3zZ942hV.png` },
        { id: '15', url: `${this.baseBlobUrl}/volantini/scansione-9RbtV60W4mxfl8kei4aXgBEDZ1O4Km.png`, previewUrl: `${this.baseBlobUrl}/volantini/scansione-9RbtV60W4mxfl8kei4aXgBEDZ1O4Km.png` },
        { id: '16', url: `${this.baseBlobUrl}/pdf/LASIGNORINA-joOjcAGhkY0dpx2dCadFU6bi3UGay3.pdf`, previewUrl: `${this.baseBlobUrl}/img/copertine/copertina_la_signorina-NpvbK3rxICiUI3ObZTID1xXA38fp2m.png` },
        { id: '17', url: `${this.baseBlobUrl}/volantini/vibro-ne7kcRNCpwBuNsCaWxOgT0XexVA4VO.png`, previewUrl: `${this.baseBlobUrl}/volantini/vibro-ne7kcRNCpwBuNsCaWxOgT0XexVA4VO.png` },
        { id: '18', url: `${this.baseBlobUrl}/audio/Quartieri_di_merda-pPed2648IR9OFgc0cZ8sASm4pkM25i.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/asicrono-coXPs0HOwmpu36j12EFlLEL0Mrf14r.jpg` },
        { id: '19', url: `${this.baseBlobUrl}/video/VIOLA-3vKsD2BEd4reQ9Bq470NITO20ejRqA.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/viola-95w03zw34RCdKI9tT9b5r7C5MGsGP1.png` },
        { id: '20', url: `${this.baseBlobUrl}/volantini/scansione2-FGM9LAtvAY5iz0DOQAqhA20aZbs25e.png`, previewUrl: `${this.baseBlobUrl}/volantini/scansione2-FGM9LAtvAY5iz0DOQAqhA20aZbs25e.png` },
        { id: '21', url: `${this.baseBlobUrl}/pdf/Lo_zerbino-lIiSQaiqqkg4xndZ5Nb30AzaaVssp4.pdf`, previewUrl: `${this.baseBlobUrl}/img/copertine/copertina_lo_zerbino-kjwdb6OB6EVEwySEyy6nXEM7tB8csf.png` },
        { id: '22', url: `${this.baseBlobUrl}/volantini/kali-jdZps6qnSWh6YwOsMr3ujvMftqY9Z8.png`, previewUrl: `${this.baseBlobUrl}/volantini/kali-jdZps6qnSWh6YwOsMr3ujvMftqY9Z8.png` },
        { id: '23', url: `${this.baseBlobUrl}/audio/Soffio_d_anima_tremolio_di_vita-YSO3PMql0GfxvUgkQMMpf577x3MVSh.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/mi_soffermo-vH3kLi5BdMHuLAZyV8ILzdFD1HZnwT.jpg` },
        { id: '24', url: `${this.baseBlobUrl}/volantini/trrt-yuY0kTxXIYtW0pGC4KCNQXagGdaFkE.jpg`, previewUrl: `${this.baseBlobUrl}/volantini/trrt-yuY0kTxXIYtW0pGC4KCNQXagGdaFkE.jpg` },
        { id: '25', url: `${this.baseBlobUrl}/video/SILENZIO-ASeoNczRYviCqvU95XYaVRqcuoVuM7.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/silenzio-4S6kEQ7VSMwliCRB3QGeypg9mkqsm6.png` },
        { id: '26', url: `${this.baseBlobUrl}/volantini/zitto1-8JWcIvczdBO4SLEUk1bLntSbcngP5v.png`, previewUrl: `${this.baseBlobUrl}/volantini/zitto1-8JWcIvczdBO4SLEUk1bLntSbcngP5v.png` },
        { id: '27', url: `${this.baseBlobUrl}/audio/Valzer_Veltroni-cfHvrSNjTB6BATELZeCwYuKkrZOsDz.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/guardo_roma-dufWHgdCpttkaWbJ136rJZ2K2BD1VH.jpg` },
        { id: '28', url: `${this.baseBlobUrl}/volantini/scansione3-xkuUG7YMxsHVfywRaonxpxbl94Ucje.png`, previewUrl: `${this.baseBlobUrl}/volantini/scansione3-xkuUG7YMxsHVfywRaonxpxbl94Ucje.png` },
        { id: '29', url: `${this.baseBlobUrl}/pdf/il_liutaio-grnroYGc5PRcxy80eqnbugwuMU61mA.pdf`, previewUrl: `${this.baseBlobUrl}/img/copertine/copertina_quando_si_rompe_una_corda-pphJNw4h4AogUKwwpFtsSSOhAXYYM9.png` },
        { id: '30', url: `${this.baseBlobUrl}/video/TUTTOFILMATO-TXZwIoGIUmAWBtsu8nx12ATem3X2we.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/copertina_tutto_filmato-8jdzPIFi16YHFmMPtMBwalun8I3I5Y.png` },
        { id: '31', url: `${this.baseBlobUrl}/audio/Viola_1-IUfMmw9gzcYtvkwUuwgGYT6epYWzgn.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/balcone-romano-U5u6n9eO4DK5Fc5bwILXNS0v2K5e9s.jpg` },
        { id: '32', url: `${this.baseBlobUrl}/audio/COMUNICATO-PM8Rt48MW1db2oSdhIDTGpSi31cyR5.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/studio_fuoco-WBjiFQhM9vWV1rd5jFcfBxfzjdS22W.jpg` },
      ]
    },
  ];

  constructor(private preloadService: PreloadService) {}

  getCatalogMetadata() {
    const metadata = this.catalogData.map(({ id, name, category, year, items }) => ({
      id, name, category, year, items: items.map(({ id, url, previewUrl }: { id: string; url: string; previewUrl: string }) => ({ id, url, previewUrl }))
    }));
    return of(metadata); // Simulated delay
  }

  getItemDetails(catalogId: string, itemId: string) {
    const catalog = this.catalogData.find(catalog => catalog.id === catalogId);
    const item = catalog?.items.find((item: any) => item.id === itemId);
    return of(item); // Simulated delay
  }

  preloadItems() {
    this.catalogData.forEach(catalog => {
      catalog.items.forEach((item: any) => {
        this.preloadService.preload(item.previewUrl).catch(err => console.error(`Failed to preload ${item.previewUrl}:`, err));
      });
    });
  }
}
