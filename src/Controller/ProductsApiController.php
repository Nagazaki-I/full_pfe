<?php

namespace App\Controller;

use MongoDB\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class ProductsApiController extends AbstractController
{
    private $mongoClient;

    public function __construct(Client $mongoClient)
    {
        $this->mongoClient = $mongoClient;
    }


    /**
     * @Route("/api/products/", name="app_api", methods={"GET"})
     */
    public function getProducts(Request $request): JsonResponse
    {
        // This gets all the documents in the collection
        $collection = $this->mongoClient->store->products;

        // This gets all the parameters passed in the URL
        $params = $request->query->all();

        // Setting up the filter
        $filter = [];
        isset($params["id"]) ? $filter["id"] = intval($params["id"]) : null;
        isset($params["category"]) ? (is_string($params["category"]) && $params["category"] ? $filter["category"] = $params["category"] : null) : null;
        isset($params["rating"]) ? $filter["rating.rate"] = ['$gt' => floatval($params["rating"])] : null;
        isset($params["price"]) ? $filter["price"] = ['$gt' => floatval($params["price"])] : null;
        // dd($filter);
        // The values to use to manage to pagination
        isset($params["page"]) ? $page = intval($params["page"]) : $page = 1;
        $limit = 20;
        $skip = ($page - 1) * $limit;

        // Pipeline for aggregation
        $pipeline = [
            ['$match' => $filter],
            ['$facet' => [  // the $facet stage is used to process multiple aggregation pipelines within a single query.
                'data' => [['$skip' => $skip], ['$limit' => $limit], ['$project' => ['_id' => 0]]], // the $project is an agregation operator that skips removes a field from the returned value
                'totalCount' => [['$count' => 'count']] // the $count is an agregation operator that counts the documents
                ]
            ]
        ];
        
        if (!$filter) {
            // $pipeline = array_slice($pipeline, 1);
            array_splice($pipeline, 0, 1);
        }

        // Perform aggregation
        $result = $collection->aggregate($pipeline)->toArray();
        
        // Extract the filtered data
        $filteredData = $result[0]['data'] ?? [];
        
        // Extract the total count
        $totalDocuments = $result[0]['totalCount'][0]['count'] ?? 0;
   
        // This is for counting the total number of the pages. I used the ceil() method to round the number up to closest integer.
        $totalPages = ceil($totalDocuments / $limit);

        if ($page > $totalPages) {
            // return $this->json(["Status" => "404", "Error" => "Page not found", "Message" => "Page number is out of range"], 404);
            return new JsonResponse(['error' => 'page not found'], 404);
        }

        // dd($params);
        // dd($filter);
        // dd($data);

        foreach ($filteredData as $doc) {
            $finalData[] = [
                "id" =>  $doc["id"],
                "title" =>  $doc["title"],
                "price" =>  $doc["price"],
                "description"  =>  $doc["description"],
                "category" =>  $doc["category"],
                "image" =>  $doc["image"], // change this back to imagePath to use the local images
                "rating" =>  $doc["rating"]["rate"],
                "reviewCount" =>  $doc["rating"]["count"]
            ];
        }

        $data = [
            "total_products" => $totalDocuments,
            "current_page" => "$page of $totalPages",
            "per_page" => $limit,
            "data" => $finalData
        ];

        
        // dd(new JsonResponse($data));
        // return $this->json($data);
        return new JsonResponse($data);
    }
}




// if ($page > 1) {
//     $previousPage = $this->generateUrl("app_api", ["page" => $page - 1]);
// }

// if ($page < $totalPages) {
//     $nextPage = $this->generateUrl("app_api", ["page" => $page + 1]);
// }