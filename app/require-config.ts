/**
 * Created by CMeleard on 24/01/2017.
 */
declare var require: any;

require.config({
    paths: {
        "knockout": "node_modules/knockout/build/output/knockout-latest.debug"
    },
    text: {
        //Valid values are 'node', 'xhr', or 'rhino'
        env: 'xhr'
    }
});