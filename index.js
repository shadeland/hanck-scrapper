/**
 * Created by adel on 5/8/17.
 */



let scrpMngr = new ScrapperManager();
scrpMngr.startAll();
// scrpMngr.start("scap2");


function extractHashTags(tw){

    let m = tw.text.match(/#\w+/g);
    tw.hashtags = m;
    return m;

}




