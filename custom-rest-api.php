/*
Plugin Name: Custom REST API
Description: カスタム REST API のエンドポイント
Version: 1.0
Author: Your Name
*/

add_action('rest_api_init', function () {
    register_rest_route('my-api/v1', '/posts', array(
        'methods'  => WP_REST_Server::CREATABLE,
        'callback' => 'my_api_insert_post',
        'permission_callback' => '__return_true',
    ));
});

function my_api_insert_post($request) {
    $post_data = array(
        'post_title'    => sanitize_text_field($request['title']),
        'post_content'  => sanitize_textarea_field($request['content']),
        'post_status'   => 'publish',
        'post_type'     => 'post',
        'post_author'   => 1,
        'post_date'     => date('Y-m-d H:i:s'),
    );

    $post_id = wp_insert_post($post_data);

    if ($post_id) {
        return rest_ensure_response(array('message' => '投稿が正常に挿入されました。', 'post_id' => $post_id));
    } else {
        return new WP_Error('insert_failed', '投稿の挿入に失敗しました。', array('status' => 500));
    }
}
