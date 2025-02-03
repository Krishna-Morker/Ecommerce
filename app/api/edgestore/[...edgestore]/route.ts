
import { initEdgeStore } from "@edgestore/server";
import {
  CreateContextOptions,
  createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  myPublicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 1, // 1MB
    }),

  myProtectedFiles: es
      .fileBucket()
      /**
       * return `true` to allow delete
       * This function must be defined if you want to delete files directly from the client.
       */
      .beforeDelete(({ ctx, fileInfo }) => {
        console.log('Attempting to delete:', fileInfo);
        return true; // allow delete
    }),
    

});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,

});

export { handler as GET, handler as POST };

export type EdgeStoreRouter =typeof edgeStoreRouter;