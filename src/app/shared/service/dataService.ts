/*
import { Injectable, signal, WritableSignal } from '@angular/core';
import { CatalogItem, Item, PreloadService } from './preload.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseBlobUrl = 'https://4neiag8fyznbz2a8.public.blob.vercel-storage.com';
  private previewLoadCount: WritableSignal<number> = signal(0);
  private totalPreviewItems: WritableSignal<number> = signal(0);
  private catalogData: CatalogItem[] = [
    {
      id: '#1 Pacchetto ',
      name: '',
      category: 'tuttorifiuto',
      year: '2023-2024',
      items: [
        { id: '0', url: `${this.baseBlobUrl}/img/copertine/manifesto-MOOU2DT10RoynVHNqYJZVFtZRuU4IY.png`, previewUrl: `${this.baseBlobUrl}/img/copertine/manifesto-MOOU2DT10RoynVHNqYJZVFtZRuU4IY.png`, description: 'MANIFESTO' },
        { id: '1', url: `${this.baseBlobUrl}/video/COMUNICATO-qtg1phrL57B6azJdDxdUlPKOwNG7XM.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/comunicato_copertina-arO08anOsWQDkSLSuBmL63baZ1sFxe.jpeg`, description: 'COMUNICATO X TUTTORIFIUTO RIFIUTOTUTTO' },
        { id: '2', url: `${this.baseBlobUrl}/audio/comunicato_v2-volWooMd96L7QBlBcGnisUoZlNTBL7.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/dhl-l4c31cxgk25xpm5C0Qh5Vkr88kKJo6.jpg`,description: 'COMUNICATO Y TUTTORIFIUTO RIFIUTOTUTTO '},
        { id: '3', url: `${this.baseBlobUrl}/volantini/occhio_fronte-Mxh1WcFE3EyovIMgzMi6wjtp8YlumC.png`, previewUrl: `${this.baseBlobUrl}/volantini/occhio_fronte-Mxh1WcFE3EyovIMgzMi6wjtp8YlumC.png`, description: 'OCCHIO FRONTE' },
        { id: '4', url: `${this.baseBlobUrl}/pdf/POESIE1-vEdxk6RetiAycUqJAyF8jAFdUF3fgg.pdf`, previewUrl: `${this.baseBlobUrl}/img/copertine/copertina_poesie-244DvzDWX2ycIIPSGRFIvj3DtzrZWt.png`, description: 'POESIE'},
        { id: '5', url: `${this.baseBlobUrl}/audio/È_ora_di_andare_a_dormire-Ruwac8EDoOToaCRzbP5WlVnVV973Hw.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/inizio%253F_fine%253F-WheSGShvcoatuqr4R7QwGiTILUtzlF.jpg`, description: 'È ORA DI ANDARE A DORMIRE' },
        { id: '6', url: `${this.baseBlobUrl}/volantini/techne-ktbekDRVUPlxFGqM2butLc6rElvy76.png`, previewUrl: `${this.baseBlobUrl}/volantini/techne-ktbekDRVUPlxFGqM2butLc6rElvy76.png`, description: 'TECHNE'},
        { id: '7', url: `${this.baseBlobUrl}/video/FIGLIDIUNOSTESSODIO-g7nB9mR0SCjKw4LxPOcz95F8sWWm9y.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/figli_di_uno_stesso_dio-5FGnoksAUo3ZtZS6LbydoyhbhM3cgS.png`, description: 'FIGLI DI UNO STESSO DIO'},
        { id: '8', url: `${this.baseBlobUrl}/audio/Finto_uomo-AIHLrGN2a1r14rLFsSILUjRXVorZj2.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/solo_un_uomo-oS1N5foHaiStj1JJy8tN4fIEx9F6sg.jpg`, description: 'FINTO UOMO'},
        { id: '9', url: `${this.baseBlobUrl}/volantini/Kali_1-TQyaYBVGoyO11PnfvKO2F1BPmF9LvO.png`, previewUrl: `${this.baseBlobUrl}/volantini/Kali_1-TQyaYBVGoyO11PnfvKO2F1BPmF9LvO.png`, description : 'KALI'},
        { id: '10', url: `${this.baseBlobUrl}/video/INTERMEZZO-9J3QLSP08V1AE0PEIUoR1dbXF2vUEg.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/intermezzo-IHJDGlayZt76VSf4lwopOHp7oxYYY9.png`, description: 'INTERMEZZO'},
        { id: '11', url: `${this.baseBlobUrl}/pdf/TRENOS-q9LhNkk9ADxPaeVXJFOQ7lLLJtYcS1.pdf`, previewUrl: `${this.baseBlobUrl}/img/copertine/copertina_trenos-U05liNJimbxn3th0Kn2MPzPPMpChUm.png`, description: 'TRENOS'},
        { id: '12', url: `${this.baseBlobUrl}/volantini/primirdial-ERsgzJycWdG8GeC7miEIzWrXS0SgV3.jpg`, previewUrl: `${this.baseBlobUrl}/volantini/primirdial-ERsgzJycWdG8GeC7miEIzWrXS0SgV3.jpg`, description: 'PRIMIRDIAL'},
        { id: '13', url: `${this.baseBlobUrl}/audio/La_legge_sul_(mio)_divorzio-TLE4iaRgTJYVSE8gO0KTUxxXXay3cX.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/scarpe_di_papà-FQRlFUiKjJffHr6Pa4bekhTfdP114i.jpg`, description: 'LA LEGGE SUL (MIO) DIVORZIO'},
        { id: '14', url: `${this.baseBlobUrl}/video/FATTOAMANO-9KyreKhwYhfnUg0S0ua7Ykq7kpgEOf.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/handmade_fatto_a_mano-bKnsyEOJq0A2NuaXelb43s3zZ942hV.png`, description: 'FATTO A MANO'},
        { id: '15', url: `${this.baseBlobUrl}/volantini/scansione-9RbtV60W4mxfl8kei4aXgBEDZ1O4Km.png`, previewUrl: `${this.baseBlobUrl}/volantini/scansione-9RbtV60W4mxfl8kei4aXgBEDZ1O4Km.png`, description: 'SCANSIONE'},
        { id: '16', url: `${this.baseBlobUrl}/pdf/LASIGNORINA-joOjcAGhkY0dpx2dCadFU6bi3UGay3.pdf`, previewUrl: `${this.baseBlobUrl}/img/copertine/copertina_la_signorina-NpvbK3rxICiUI3ObZTID1xXA38fp2m.png`, description: 'LA SIGNORINA'},
        { id: '17', url: `${this.baseBlobUrl}/volantini/vibro-RqMC1LOKyvn6HMXM2gObhKiS2WmJCH.png`, previewUrl: `${this.baseBlobUrl}/volantini/vibro-RqMC1LOKyvn6HMXM2gObhKiS2WmJCH.png`, description: 'VIBRO'},
        { id: '18', url: `${this.baseBlobUrl}/audio/Quartieri_di_merda-pPed2648IR9OFgc0cZ8sASm4pkM25i.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/asicrono-coXPs0HOwmpu36j12EFlLEL0Mrf14r.jpg`, description: 'QUARTIERI DI MERDA'},
        { id: '19', url: `${this.baseBlobUrl}/video/VIOLA-3vKsD2BEd4reQ9Bq470NITO20ejRqA.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/viola-95w03zw34RCdKI9tT9b5r7C5MGsGP1.png`, description: 'VIOLA'},
        { id: '20', url: `${this.baseBlobUrl}/volantini/scansione2-FGM9LAtvAY5iz0DOQAqhA20aZbs25e.png`, previewUrl: `${this.baseBlobUrl}/volantini/scansione2-FGM9LAtvAY5iz0DOQAqhA20aZbs25e.png`, description: 'SCANSIONE'},
        { id: '21', url: `${this.baseBlobUrl}/pdf/Lo_zerbino-lIiSQaiqqkg4xndZ5Nb30AzaaVssp4.pdf`, previewUrl: `${this.baseBlobUrl}/img/copertine/copertina_lo_zerbino-kjwdb6OB6EVEwySEyy6nXEM7tB8csf.png`, description: 'LO ZERBINO'},
        { id: '22', url: `${this.baseBlobUrl}/volantini/kali-jdZps6qnSWh6YwOsMr3ujvMftqY9Z8.png`, previewUrl: `${this.baseBlobUrl}/volantini/kali-jdZps6qnSWh6YwOsMr3ujvMftqY9Z8.png`, description: 'KALI'},
        { id: '23', url: `${this.baseBlobUrl}/audio/Soffio_d_anima_tremolio_di_vita-YSO3PMql0GfxvUgkQMMpf577x3MVSh.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/mi_soffermo-vH3kLi5BdMHuLAZyV8ILzdFD1HZnwT.jpg` , description: 'SOFFIO D\'ANIMA TREMOLIO DI VITA'},
        { id: '24', url: `${this.baseBlobUrl}/volantini/trrt-yuY0kTxXIYtW0pGC4KCNQXagGdaFkE.jpg`, previewUrl: `${this.baseBlobUrl}/volantini/trrt-yuY0kTxXIYtW0pGC4KCNQXagGdaFkE.jpg`, description: 'TRRT' },
        { id: '25', url: `${this.baseBlobUrl}/video/SILENZIO-ASeoNczRYviCqvU95XYaVRqcuoVuM7.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/silenzio-4S6kEQ7VSMwliCRB3QGeypg9mkqsm6.png`, description: 'SILENZIO' },
        { id: '26', url: `${this.baseBlobUrl}/volantini/zitto1-8JWcIvczdBO4SLEUk1bLntSbcngP5v.png`, previewUrl: `${this.baseBlobUrl}/volantini/zitto1-8JWcIvczdBO4SLEUk1bLntSbcngP5v.png` , description: 'ZITTO' },
        { id: '27', url: `${this.baseBlobUrl}/audio/Valzer_Veltroni-cfHvrSNjTB6BATELZeCwYuKkrZOsDz.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/guardo_roma-dufWHgdCpttkaWbJ136rJZ2K2BD1VH.jpg`, description: 'VALZER VELTRONI' },
        { id: '28', url: `${this.baseBlobUrl}/volantini/scansione3-xkuUG7YMxsHVfywRaonxpxbl94Ucje.png`, previewUrl: `${this.baseBlobUrl}/volantini/scansione3-xkuUG7YMxsHVfywRaonxpxbl94Ucje.png`, description: 'SCANSIONE' },
        { id: '29', url: `${this.baseBlobUrl}/pdf/Il_liutaio-grnroYGc5PRcxy80eqnbugwuMU61mA.pdf`, previewUrl: `${this.baseBlobUrl}/img/copertine/copertina_quando_si_rompe_una_corda-pphJNw4h4AogUKwwpFtsSSOhAXYYM9.png`, description: 'IL LIUTAIO' },
        { id: '30', url: `${this.baseBlobUrl}/video/TUTTOFILMATO-TXZwIoGIUmAWBtsu8nx12ATem3X2we.mp4`, previewUrl: `${this.baseBlobUrl}/img/copertine/copertina_tutto_filmato-8jdzPIFi16YHFmMPtMBwalun8I3I5Y.png`, description: 'TUTTOFILMATO' },
        { id: '31', url: `${this.baseBlobUrl}/audio/Viola_1-IUfMmw9gzcYtvkwUuwgGYT6epYWzgn.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/balcone-romano-U5u6n9eO4DK5Fc5bwILXNS0v2K5e9s.jpg` , description: 'VIOLA' },
        { id: '32', url: `${this.baseBlobUrl}/audio/COMUNICATO-PM8Rt48MW1db2oSdhIDTGpSi31cyR5.mp3`, previewUrl: `${this.baseBlobUrl}/img/copertine/studio_fuoco-WBjiFQhM9vWV1rd5jFcfBxfzjdS22W.jpg`, description: 'COMUNICATO' },
        { id: '33', url: `${this.baseBlobUrl}/volantini/scansione_1-w5DQFz7e8xtmZXiqEQvvGyDAYcNIMT.png`, previewUrl: `${this.baseBlobUrl}/volantini/scansione_1-w5DQFz7e8xtmZXiqEQvvGyDAYcNIMT.png`, description: 'SCANSIONE' },
      ]
    },

  ];

  constructor(private preloadService: PreloadService) {}

  getCatalogMetadata() {
    return this.catalogData.map(({ id, name, category, year, items }) => ({
      id, name, category, year, items: items.map(({ id, url, previewUrl }: { id: string; url: string; previewUrl: string }) => ({ id, url, previewUrl }))
    }));
  }

  getItemDetails(catalogId: string, itemId: string): Item | null {
    const catalog = this.catalogData.find(catalog => catalog.id === catalogId);
    return catalog?.items.find((item: any) => item.id === itemId) || null;
  }

  async preloadImage(url: string): Promise<void> {
    await this.preloadService.preload(url);
    this.previewLoadCount.update(count => count + 1);
  }

  async preloadImagesForCatalog(catalogId: string): Promise<void> {
    const catalog = this.catalogData.find(catalog => catalog.id === catalogId);
    if (!catalog) return;

    const previewUrls = catalog.items.map(item => item.previewUrl);

    this.totalPreviewItems.set(previewUrls.length);

    await this.preloadAndCacheUrls(previewUrls);
    await this.preloadAllItemTypes(catalog.items);

    console.log('All files preloaded for catalog:', catalogId);
  }

  async preloadAllPreviews(): Promise<void> {
    const previewUrls: string[] = [];
    this.catalogData.forEach(catalog => {
      catalog.items.forEach(item => {
        previewUrls.push(item.previewUrl);
      });
    });

    this.totalPreviewItems.set(previewUrls.length);

    await this.preloadAndCacheUrls(previewUrls);

    console.log('All preview images preloaded.');
  }

  async preloadAllItems(): Promise<void> {
    const otherUrls: string[] = [];
    this.catalogData.forEach(catalog => {
      catalog.items.forEach(item => {
        otherUrls.push(item.url);
      });
    });

    otherUrls.sort((a, b) => this.getFileSize(b) - this.getFileSize(a));

    await this.preloadAndCacheUrls(otherUrls);

    console.log('All items preloaded.');
  }

  private async preloadAndCacheUrls(urls: string[]): Promise<void> {
    for (const url of urls) {
      const cached = await this.preloadService.getFromCache(url);
      const idb = await this.preloadService.getFromIndexedDB(url);
      if (!cached && !idb) {
        await this.preloadImage(url);
        const base64data = await this.preloadService.convertUrlToBase64(url);
        const size = this.getFileSize(base64data);
        await this.preloadService.saveToIndexedDB(url, base64data, size);
      }
    }
  }

  private async preloadAllItemTypes(items: Item[]): Promise<void> {
    const imageUrls = items.filter(item => item.url.endsWith('.jpg') || item.url.endsWith('.jpeg') || item.url.endsWith('.png') || item.url.endsWith('.gif')).map(item => item.url);
    const audioUrls = items.filter(item => item.url.endsWith('.mp3') || item.url.endsWith('.wav') || item.url.endsWith('.ogg')).map(item => item.url);
    const pdfUrls = items.filter(item => item.url.endsWith('.pdf')).map(item => item.url);
    const videoUrls = items.filter(item => item.url.endsWith('.mp4')).map(item => item.url);

    await this.preloadAndCacheUrls(imageUrls);
    console.log('All images preloaded.');

    await this.preloadAndCacheUrls(audioUrls);
    console.log('All audio files preloaded.');

    await this.preloadAndCacheUrls(pdfUrls);
    console.log('All PDF files preloaded.');

    await this.preloadAndCacheUrls(videoUrls);
    console.log('All video files preloaded.');
  }

  private getFileSize(base64: string): number {
    const padding = (base64.match(/=/g) || []).length;
    const size = (base64.length * 3) / 4 - padding;
    return size;
  }

  async syncCatalogs(): Promise<void> {
    const existingCatalogs = await this.preloadService.getAllCatalogs();
    if (existingCatalogs.length !== this.catalogData.length) {
      // Clear existing catalogs and reload from source
      await this.preloadService.clearCatalogs();
      for (const catalog of this.catalogData) {
        await this.preloadService.saveCatalog(catalog);
      }
    }
  }
}
*/
